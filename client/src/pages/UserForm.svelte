<script>
    import { post } from '../util'
    import Card from "sveltestrap/src/Card.svelte";
    import CardBody from "sveltestrap/src/CardBody.svelte";
    import CardHeader from "sveltestrap/src/CardHeader.svelte";
    import CardFooter from "sveltestrap/src/CardFooter.svelte";
    import Form from "sveltestrap/src/Form.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Row from "sveltestrap/src/Row.svelte";
    import Col from "sveltestrap/src/Col.svelte";
    import {usersEdit} from "../state";
    let ruolo = "Patient"

    let data = { }
    async function  save(event) {
      console.log(data)
      event.preventDefault()
      let res = await post("/user", data)
      console.log(res)
      usersEdit.set(false)
    }
  </script> 
  
  <Col class="col-lg-7">
    <Card class="shadow-lg border-0 rounded-lg mt-5">
      <CardHeader>
        <h3 class="text-center font-weight-light my-4">Create Account</h3>
      </CardHeader>
      <CardBody>
        <Form>
            <FormGroup>
                <h3>Role</h3>
                <label>
                    <input type=radio bind:group={data.ruolo} name="ruolo" value={"Administrator"}>
                    Administrator
                </label>
                <label>
                    <input type=radio bind:group={data.ruolo} name="ruolo" value={"Patient"}>
                    Patient
                </label>
                <label>
                    <input type=radio bind:group={data.ruolo} name="ruolo" value={"Nurse"}>
                    Nurse
                </label>
                <label>
                    <input type=radio bind:group={data.ruolo} name="ruolo" value={"Doctor"}>
                    Doctor
                </label>
            
              </FormGroup>
              <FormGroup>
                <Label for="codicediscale" class="small mb-1">CodicFiscale</Label>
                <Input
                bind:value={data.CF}
                  class="py-4"
                  type="text"
                  name="CF"
                  id="CF"
                  placeholder="Codice Fiscale" />
              </FormGroup>
          <Row form>
            <div class="col-md-6">
              <FormGroup>
                <Label for="inputFirstName" class="small mb-1">Nome</Label>
                <Input
                  bind:value={data.nome}
                  class="py-4"
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Enter first name" />
              </FormGroup>
            </div>
            <div class="col-md-6">
              <FormGroup>
                <Label for="inputLastName" class="small mb-1">Cognome</Label>
                <Input
                  bind:value={data.cognome}
                  class="py-4"
                  type="text"
                  name="cognome"
                  id="cognome"
                  placeholder="Enter last name" />
              </FormGroup>
            </div>
          </Row>
          <Row form>
            <div class="col-md-6">
              <FormGroup>
                <Label for="inputAddress" class="small mb-1">Indirizzo</Label>
                <Input
                  bind:value={data.indirizzo}
                  class="py-4"
                  type="text"
                  name="indirizzo"
                  id="indirizzo"
                  placeholder="Enter Address" />
              </FormGroup>
            </div>
            <div class="col-md-6">
              <FormGroup>
                <Label for="inputPhone" class="small mb-1">Telefono</Label>
                <Input
                  bind:value={data.telefono}
                  class="py-4"
                  type="text"
                  name="telefono"
                  id="telefono"
                  placeholder="Enter Phone" />
              </FormGroup>
            </div>
          </Row>
          <FormGroup>
            <Label for="exampleEmail" class="small mb-1">Email</Label>
            <Input
              bind:value={data.email}
              class="py-4"
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Enter email address" />
          </FormGroup>
          <Row form>
            <div class="col-md-6">
              <FormGroup>
                <Label for="inputPassword" class="small mb-1">Password</Label>
                <Input
                  bind:value={data.pwd}
                  class="py-4"
                  type="password"
                  name="inputPassword"
                  id="inputPassword"
                  placeholder="Enter password" />
              </FormGroup>
            </div>
            <div class="col-md-6">
              <FormGroup>
                <Label for="inputConfirmPassword" class="small mb-1">
                  Confirm Password
                </Label>
                <Input
                  class="py-4"
                  type="password"
                  name="inputConfirmPassword"
                  id="inputConfirmPassword"
                  placeholder="Confirm password" />
              </FormGroup>
            </div>
          </Row>
          <FormGroup class="mt-4 mb-0">
            <Button on:click={save} color="primary" block href="pages/authentication/login">
              Create Account
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  </Col>
  <button on:click={() => usersEdit.set(false) }>List</button>
  