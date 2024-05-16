import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import TeamModel from '../models/Team.model';

import { Response } from 'superagent';
import { arrayTeams } from './mock/tems.mock';

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
  
  it('should return all teams', async function() {
    sinon.stub(TeamModel.prototype, 'findAll').resolves(arrayTeams); // Substituir SequelizeBook por TeamsModel e ajustar o método de stub

    const { status, body } = await chai.request(app).get('/teams'); // Corrigir a rota para a rota de Teams

    expect(status).to.equal(200);
    expect(body).to.deep.equal(arrayTeams);
  });

});
