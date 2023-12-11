<template>
    <div class="col-md-12 text-center my-2">
      <div class="container my-4">
        <div class="mb-4">
          <select
            @change="redireccionar"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="">TraduccionIdioma</option>
            <option value="/">origenIdioma</option>
            <option value="/Idioma">Idioma</option>
            <option value="#">Three</option>
          </select>
        </div>
        <div v-if="mostrandoFormulario">
          <form>
            <div class="row">
              <div class="col">
                <label for="numerotraduccion" class="form-label"
                  ><b>Numero de traduccion</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="numerotraduccion"
                  aria-describedby="numerotraduccion"
                  ref="numerotraduccion"
                />
              </div>
              <div class="col">
                <label for="nombretraduccion" class="form-label"
                  ><b>Nombre de traduccion</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nombretraduccion"
                  aria-describedby="nombretraduccion"
                  ref="nombretraduccion"
                />
              </div>
              <div class="col">
                <label for="ididioma" class="form-label"
                  ><b>Id del Idioma</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="ididioma"
                  aria-describedby="ididioma"
                  ref="ididioma"
                />
              </div>
            </div>
            <div class="col-md-12 text-center my-2">
              <button
                type="submit"
                class="btn btn-success"
                @click="agregarTraduccionIdioma"
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
                <label for="numerotraduccion" class="form-label"
                  ><b>Numero de Traduccion</b></label
                >
                <input
                  v-if="TraduccionIdiomaActual"
                  type="text"
                  class="form-control"
                  id="numerotraduccion"
                  aria-describedby="numerotraduccion"
                  v-model="TraduccionIdiomaActual.numerotraduccion"
                />
              </div>
              <div class="col">
                <label for="nombretraduccion" class="form-label"
                  ><b>Nombre de traduccion</b></label
                >
                <input
                  v-if="TraduccionIdiomaActual"
                  type="text"
                  class="form-control"
                  id="nombretraduccion"
                  aria-describedby="nombretraduccion"
                  v-model="TraduccionIdiomaActual.nombretraduccion"
                />
              </div>
              <div class="col">
                <label for="ididioma" class="form-label"
                  ><b>Id del Idioma</b></label
                >
                <input
                  v-if="TraduccionIdiomaActual"
                  type="text"
                  class="form-control"
                  id="ididioma"
                  aria-describedby="ididioma"
                  v-model="TraduccionIdiomaActual.ididioma"
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
          <table class="table table-dark table-striped" v-if="TraduccionIdiomas">
            <thead>
              <tr>
                <th>Id</th>
                <th>Numero de traducciones</th>
                <th>Nombre de traducciones</th>
                <th>Id del Idioma</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody v-if="TraduccionIdiomas">
              <tr v-for="TraduccionIdioma in TraduccionIdiomas" :key="TraduccionIdioma.id">
                <td>{{ TraduccionIdioma.id }}</td>
                <td>{{ TraduccionIdioma.nombretraduccion}}</td>
                <td>{{ TraduccionIdioma.ididioma }}</td>
                <td>
                  <button class="btn btn-danger" @click="eliminar(TraduccionIdioma.id)">
                    Eliminar
                  </button>
                  <button
                    class="btn btn-info"
                    @click="iniciarActualizacion(TraduccionIdioma.id)"
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
  import { ITraduccionIdioma } from "../Interface/ITraduccionIdioma";
  import { Router } from "vue-router";
  
  @Options({
    props: {
      TraduccionIdioma: Array,
    },
  })
  export default class Idioma extends Vue {
    mostrandoFormulario = false;
    actualizando = false;
    TraduccionIdiomaActual: ITraduccionIdioma | null = null;
    $router!: Router;
    redireccionar(event: Event) {
      const selectedOption = (event.target as HTMLSelectElement).value;
      if (selectedOption) {
        this.$router.push(selectedOption);
      }
    }
    TraduccionIdiomas: Array<ITraduccionIdioma> = [];
  
    mounted() {
      this.fetchData();
    }
  
    //Mostrar datos de la Base de datos
    fetchData() {
      fetch("http://localhost:3000/api/TraduccionIdioma")
        .then((response) => response.json())
        .then((data: ITraduccionIdioma[] | undefined) => {
          // Verificar si data es undefined antes de intentar ordenar
          if (data) {
            // Ordenar los traducciones idiomas por ID
            this.TraduccionIdiomas = data.sort((a, b) => {
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
    async agregarTraduccionIdioma() {
      try {
        const numerotraduccionInput = this.$refs.numerotraduccion as HTMLInputElement;
        const nombretraduccionInput = this.$refs.nombretraduccion as HTMLInputElement;
        const ididiomaInput = this.$refs.ididioma as HTMLInputElement;
  
        if (
          !numerotraduccionInput ||
          !nombretraduccionInput ||
          !ididiomaInput
        ) {
          console.error(
            "Al menos uno de los campos del formulario no está presente."
          );
          return;
        }
  
        const numerotraduccion = parseInt(numerotraduccionInput.value, 10);
        const nombretraduccion = parseInt(nombretraduccionInput.value, 10);
        const ididioma = parseInt(ididiomaInput.value, 10);
  
        const response = await fetch("http://localhost:3000/api/TraduccionIdioma", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numerotraduccion: Number (numerotraduccion),
            nombretraduccion,
            ididioma: Number (ididioma),
          }),
        });
  
        const data = await response.json();
        console.log(data);
  
        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } catch (error) {
        console.error("Error al agregar la TraduccionIdioma:", error);
      }
    }
  
    //Eliminar
    async eliminar(id: number | undefined) {
      try {
        await fetch(`http://localhost:3000/api/TraduccionIdioma/${id}`, {
          method: "DELETE",
        });
        // Actualizar la lista de idioma después de eliminar
        this.fetchData();
      } catch (error) {
        console.error("Error al eliminar la TraduccionIdioma:", error);
      }
    }
    iniciarActualizacion(id: number | undefined) {
      if (id !== undefined) {
        this.actualizando = true;
        // Obtener datos del idioma para prellenar el formulario
        this.obtenerTraduccionIdioma(id);
      }
    }
  
    async obtenerTraduccionIdioma(id: number) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/TraduccionIdioma/${id}`
        );
        const data = await response.json();
        if (
          typeof data.nombretraduccion === "string" &&
          !isNaN(Number(data.nombretraduccion))
        ) {
          data.nombretraduccion = Number(data.nombretraduccion);
        }
        this.TraduccionIdiomaActual = data;
      } catch (error) {
        console.error("Error al obtener datos del TraduccionIdioma:", error);
      }
    }
  
    async guardarActualizacion() {
      if (this.TraduccionIdiomaActual) {
        const {
          id,
          numerotraduccion,
          nombretraduccion,
          ididioma,
        } = this.TraduccionIdiomaActual;
        try {
          const response = await fetch(
            `http://localhost:3000/api/TraduccionIdioma/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                
                numerotraduccion,
                nombretraduccion,
                ididioma: Number(ididioma),
              }),
            }
          );
          const data = await response.json();
          console.log(data);
          // Terminar la actualización y recargar la página
          this.actualizando = false;
          location.reload();
        } catch (error) {
          console.error("Error al actualizar la  TraduccionIdioma:", error);
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
  