import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import TeamModel from '../models/Team.model';

import { Response } from 'superagent';
import teamsMocks from './mock/teams.mock';
import Teams from '../database/models/TeamsModel';
import User from '../database/models/UserModel';
import LoginController from '../controllers/Login.controller';
import userMock from './mock/user.mock';
import LoginService from '../services/Login.service';

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
