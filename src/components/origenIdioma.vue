<template>
    <div class="col-md-12 text-center my-2">
      <div class="container my-4">
        <div class="mb-4">
          <select
            @change="redireccionar"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="">origenIdioma</option>
            <option value="/">TraduccionIdioma</option>
            <option value="/Idioma">Idioma</option>
            <option value="#">Three</option>
          </select>
        </div>
        <div v-if="mostrandoFormulario">
          <form>
            <div class="row">
              <div class="col">
                <label for="nombrepais" class="form-label"
                  ><b>Nombre del pais</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nombrepais"
                  aria-describedby="nombrepais"
                  ref="nombrepais"
                />
              </div>
              <div class="col">
                <label for="idiomaoficial" class="form-label"
                  ><b>Nombre del Idioma Oficial</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="idiomaoficial"
                  aria-describedby="idiomaoficial"
                  ref="idiomaoficial"
                />
              </div>
            </div>
            <div class="col-md-12 text-center my-2">
              <button
                type="submit"
                class="btn btn-success"
                @click="agregarorigenIdioma"
              >
                Save
              </button>
              <button type="submit" class="btn btn-secondary" @click="cancelar">
                Cancelar
              </button>
            </div>
          </form>
        </div>
        <div v-if="actualizando">
          <form>
            <div class="row">
              <div class="col">
                <label for="nombrepais" class="form-label"
                  ><b>Nombre del pais </b></label
                >
                <input
                  v-if="origenIdiomaActual"
                  type="text"
                  class="form-control"
                  id="nombrepais"
                  aria-describedby="nombrepais"
                  v-model="origenIdiomaActual.nombrepais"
                />
              </div>
              <div class="col">
                <label for="idiomaoficial" class="form-label"
                  ><b>Nombre del Idioma Oficial</b></label
                >
                <input
                  v-if="origenIdiomaActual"
                  type="text"
                  class="form-control"
                  id="idiomaoficial"
                  aria-describedby="idiomaoficial"
                  v-model="origenIdiomaActual.idiomaoficial"
                />
              </div>
            </div>
            <div class="col-md-12 text-center my-2">
              <button
                type="submit"
                class="btn btn-success"
                @click="guardarActualizacion"
              >
                Save
              </button>
              <button type="submit" class="btn btn-secondary" @click="cancelar">
                Cancelar
              </button>
            </div>
          </form>
        </div>
        <div class="my-4">
          <table class="table table-dark table-striped" v-if="origenIdiomas">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre del pais</th>
                <th>Idioma Oficial</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody v-if="origenIdiomas">
              <tr v-for="origenIdioma in origenIdiomas" :key="origenIdioma.id">
                <td>{{ origenIdioma.id }}</td>
                <td>{{ origenIdioma.nombrepais}}</td>
                <td>{{ origenIdioma.idiomaoficial }}</td>
                <td>
                  <button class="btn btn-danger" @click="eliminar(origenIdioma.id)">
                    Eliminar
                  </button>
                  <button
                    class="btn btn-info"
                    @click="iniciarActualizacion(origenIdioma.id)"
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary" @click="mostrarFormulario">
            Agregar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { IorigenIdioma } from "../Interface/IorigenIdioma";
  import { Router } from "vue-router";
  
  @Options({
    props: {
      origenIdioma: Array,
    },
  })
  export default class Idioma extends Vue {
    mostrandoFormulario = false;
    actualizando = false;
    origenIdiomaActual: IorigenIdioma | null = null;
    $router!: Router;
    redireccionar(event: Event) {
      const selectedOption = (event.target as HTMLSelectElement).value;
      if (selectedOption) {
        this.$router.push(selectedOption);
      }
    }
    origenIdiomas: Array<IorigenIdioma> = [];
  
    mounted() {
      this.fetchData();
    }
  
    //Mostrar datos de la Base de datos
    fetchData() {
      fetch("http://localhost:3000/api/origenIdioma")
        .then((response) => response.json())
        .then((data: IorigenIdioma[] | undefined) => {
          // Verificar si data es undefined antes de intentar ordenar
          if (data) {
            // Ordenar los origenes idiomas por ID
            this.origenIdiomas = data.sort((a, b) => {
              // Verificar que ambas instancias tengan la propiedad 'id' antes de restarlas
              if (a.id !== undefined && b.id !== undefined) {
                return a.id - b.id;
              } else {
                console.error("Uno de los objetos no tiene una propiedad 'id'.");
                return 0; // Otra opción podría ser devolver NaN si no puedes garantizar 'id'
              }
            });
          } else {
            console.error("La respuesta no contiene datos válidos.");
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos:", error);
        });
    }
  
    mostrarFormulario() {
      this.mostrandoFormulario = true;
    }
    //Agregar Datos en la Base de datos
    async agregarorigenIdioma() {
      try {
        const nombrepaisInput= this.$refs.nombrepais as HTMLInputElement;
        const idiomaoficialInput = this.$refs.idiomaoficial as HTMLInputElement;
        
        if (
          !nombrepaisInput ||
          !idiomaoficialInput
        ) {
          console.error(
            "Al menos uno de los campos del formulario no está presente."
          );
          return;
        }
  
        const nombrepais= parseInt(nombrepaisInput.value, 10);
        const idiomaoficial = parseInt(idiomaoficialInput.value, 10);
        
  
        const response = await fetch("http://localhost:3000/api/origenIdioma", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           nombrepais,
           idiomaoficial
          }),
        });
  
        const data = await response.json();
        console.log(data);
  
        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } catch (error) {
        console.error("Error al agregar el origenIdioma:", error);
      }
    }
  
    //Eliminar
    async eliminar(id: number | undefined) {
      try {
        await fetch(`http://localhost:3000/api/origenIdioma/${id}`, {
          method: "DELETE",
        });
        // Actualizar la lista de origen idioma después de eliminar
        this.fetchData();
      } catch (error) {
        console.error("Error al eliminar el origenIdioma:", error);
      }
    }
    iniciarActualizacion(id: number | undefined) {
      if (id !== undefined) {
        this.actualizando = true;
        // Obtener datos del origen idioma para prellenar el formulario
        this.obtenerorigenIdioma(id);
      }
    }
  
    async obtenerorigenIdioma(id: number) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/origenIdioma/${id}`
        );
        const data = await response.json();
        if (
          typeof data.nombrepais === "string" &&
          !isNaN(Number(data.nombrepais))
        ) {
          data.nombrepais = Number(data.nombrepais);
        }
        this.origenIdiomaActual = data;
      } catch (error) {
        console.error("Error al obtener datos del origenIdioma:", error);
      }
    }
  
    async guardarActualizacion() {
      if (this.origenIdiomaActual) {
        const {
          id,
          nombrepais,
          idiomaoficial,
        
        } = this.origenIdiomaActual;
        try {
          const response = await fetch(
            `http://localhost:3000/api/origenIdioma/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                
                nombrepais,
             idiomaoficial,
              }),
            }
          );
          const data = await response.json();
          console.log(data);
          // Terminar la actualización y recargar la página
          this.actualizando = false;
          location.reload();
        } catch (error) {
          console.error("Error al actualizar el origenIdioma:", error);
        }
      }
    }
    cancelar() {
      this.actualizando = false;
      this.mostrandoFormulario = false;
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style src="../assets/bootstrap.min.css"></style>
  <style src="../assets/style.css"></style>
  