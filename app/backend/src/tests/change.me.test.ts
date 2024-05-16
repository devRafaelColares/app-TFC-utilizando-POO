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
