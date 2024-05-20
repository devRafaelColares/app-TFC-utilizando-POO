import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import TeamModel from '../models/Team.model';
import MatchesModel from '../models/Matches.model'

import { Response } from 'superagent';
import teamsMocks from './mock/teams.mock';

import Matches from '../database/models/MatchesModel'
import Teams from '../database/models/TeamsModel';
import User from '../database/models/UserModel';
import LoginController from '../controllers/Login.controller';
import userMock from './mock/user.mock';
import LoginService from '../services/Login.service';
import teamsMock from './mock/teams.mock';
import JwtUtils, { TokenPayload } from '../utils/jwtUtils';
import mapStatusHTTP from '../utils/mapStatusHTTP';

chai.use(chaiHttp);

const { expect } = chai;


describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });


  describe('Testes para rota teams', () => {
  afterEach(function() {
    sinon.restore();
  });
  
  it('Verifica se retorna todos os times', async function() {
    sinon.stub(TeamModel.prototype, 'findAll').resolves(teamsMocks.arrayTeams);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.arrayTeams);
  });

  it('Verifica se retorna todos os times', async function() {
    sinon.stub(Teams, 'findAll').resolves(teamsMocks.arrayTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.arrayTeams);
  });

  it('Verifica se retorna um time ao buscar por id', async function() {
    sinon.stub(Teams, 'findOne').resolves(teamsMocks.teamById as any);

    const { status, body } = await chai.request(app).get('/teams/5');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.teamById);
  });

  it('Verifica se retorna not found se o time não existir', async function() {
    sinon.stub(Teams, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/5');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 5 not found');
  });

 });
});

describe('POST /login', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('Verifica se é possível fazer login', async function() {
    const httpRequestBody = userMock.validUser;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

    expect(httpResponse.status).to.be.equal(200);
  });

  it('Verifica se alguma falha na conexão com o banco de dados retornará 500', async function() {
    const httpRequestBody = userMock.validUser

    sinon.stub(LoginService.prototype, 'login').resolves(undefined)

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(500);
  });

  it('Verifica se é possível fazer login sem um email', async function() {
    const httpRequestBody = userMock.userWithoutEmail;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(400);
  });

  it('Verifica se é possível fazer login sem um password', async function() {
    const httpRequestBody = userMock.userWithoutPassword;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(400);
  });

  it('Verifica se é possível fazer login sem inserir os dados', async function() {
    const httpRequestBody = userMock.userWithoutData;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(400);
  });

  it('Verifica se é possível fazer login com dados inválidos', async function() {
    const httpRequestBody = userMock.noValidUser;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body.message).to.be.equal('Invalid email or password');
  });

  it('Verifica se é possível fazer login com email inválido', async function() {
    const httpRequestBody = userMock.invalidEmailUser;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body.message).to.be.equal('Invalid email or password');
  });

  it('Verifica se é possível fazer login com senha inválida', async function() {
    const httpRequestBody = userMock.invalidPasswordUser;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body.message).to.be.equal('Invalid email or password');
  });
});


describe('GET /login/role', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar a função do usuário quando um token válido for fornecido', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MTYxNzE5Njh9.reM5jsXd8mL8IZrTCeFenw4HIzKZk1m60nJ4rUDJmcY';
    
    const verifyStub = sinon.stub(JwtUtils, 'verify').returns({
      email: 'admin@admin.com',
      id: 1
    });
    
    const res = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    
    expect(res.body).to.have.property('role');

    verifyStub.restore();
  });

  it('deve retornar 401 quando nenhum token for fornecido', async () => {
    const res = await chai.request(app).get('/login/role');

    expect(res).to.have.status(401);
  });

  it('should return 401 when invalid token is provided', async () => {
    const token = 'invalid_token_here';
    
    const verifyStub = sinon.stub(JwtUtils, 'verify').throws(new Error('Invalid token'));
    
    const res = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(401);

    verifyStub.restore();
  });
});


describe('GET /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('findAll deve retornar matches com teamname', async () => {
    const findAllStub = sinon.stub(Matches, 'findAll').resolves(teamsMock.allTeams as any);

    const matchesModel = new MatchesModel();
    const result = await matchesModel.findAll();

    expect(result).to.deep.equal(teamsMock.allTeams);
    expect(findAllStub.calledOnce).to.be.true;
  });

  it('deve retornar todas as correspondências quando nenhuma consulta for fornecida', async () => {
    const res = await chai.request(app).get('/matches');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('deve retornar partidas em andamento quando query inProgress=true', async () => {
    const res = await chai.request(app).get('/matches?inProgress=true');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    res.body.forEach((match: any) => {
      expect(match.inProgress).to.be.true;
    });
  });

  it('deve retornar partidas que não estão em andamento quando query inProgress=false', async () => {
    const res = await chai.request(app).get('/matches?inProgress=false');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    res.body.forEach((match: any) => {
      expect(match.inProgress).to.be.false;
    });
  });
});

describe('mapStatusHTTP', () => {
  it('deve mapear os códigos de status corretamente', () => {
    expect(mapStatusHTTP('SUCCESSFUL')).to.equal(200);
    expect(mapStatusHTTP('BAD_REQUEST')).to.equal(400);
    expect(mapStatusHTTP('INVALID_DATA')).to.equal(401);
    expect(mapStatusHTTP('NOT_FOUND')).to.equal(404);
    expect(mapStatusHTTP('CONFLICT')).to.equal(409);
    expect(mapStatusHTTP('UNKNOWN_STATUS')).to.equal(500);
  });
});