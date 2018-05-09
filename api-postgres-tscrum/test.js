process.env.NODE_ENV = 'test';

let sequelize = require("sequelize");
let Miembros = require('./server/models/miembros');
let MiembrosCont = require('./server/controllers/miembros');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app');
let should = chai.should();

chai.use(chaiHttp);

describe('Miembros', () => {
    
  describe('/GET miembros', () => {
      it('it should GET all the members', (done) => {
            chai.request(server)
            .get('/api/miembros-test/1')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
               // res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  
  describe('/POST members', () => {
      it('it should POST a member', (done) => {
        let miembros = {
            matricula: "A03127045",
            nombre: "Jose",
            carrera: "ITC",
            password: "adios"
        }
            chai.request(server)
            .post('/api/register')
            .send(miembros)
            .end((err, res) => {
                res.should.have.status(200);
          //      res.body.should.be.a('object');
               // res.body.should.have.property('errors');
            //    res.body.errors.should.have.property('password');
             //   res.body.errors.pages.should.have.property('kind').eql('required');
             // console.log(res);
              done();
            });
      });
      
      it('it should NOT POST a member without password ', (done) => {
        let miembros = {
            matricula: "A02127025",
            nombre: "Jose",
            carrera: "ITC"
        }
            chai.request(server)
            .post('/api/register')
            .send(miembros)
            .end((err, res) => {
                res.should.have.status(404);
               
              done();
            });
      }); 
  });


  
});


describe('Technologies', () => {
    
  
  describe('/POST technologies', () => {
      it('it should POST a technology', (done) => {
        let technology = {
            id: "002",
            name: "Raspberry"
        }
            chai.request(server)
            .post('/api/technologies-test')
            .send(technology)
            .end((err, res) => {
                res.should.have.status(200);
          //      res.body.should.be.a('object');
               // res.body.should.have.property('errors');
            //    res.body.errors.should.have.property('password');
             //   res.body.errors.pages.should.have.property('kind').eql('required');
             // console.log(res);
              done();
            });
      });
      
      it('it should NOT POST a tech without parameters ', (done) => {
        let tech = {
        }
            chai.request(server)
            .post('/api/technologies-test')
            .send(tech)
            .end((err, res) => {
                res.should.have.status(400);
               
              done();
            });
      }); 
      
  });


  
});