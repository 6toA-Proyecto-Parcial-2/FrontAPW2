<template>
    <div class="col-md-12 text-center my-2">
      <div class="container my-4">
        <div class="mb-4">
          <select
            @change="redireccionar"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="">Idioma</option>
            <option value="/">origenIdioma</option>
            <option value="/TraduccionIdioma">TraduccionIdioma</option>
            <option value="#">Three</option>
          </select>
        </div>
        <div v-if="mostrandoFormulario">
          <form>
            <div class="row">
              <div class="col">
                <label for="nombreIdioma" class="form-label"
                  ><b>Nombre del Idioma</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nombreIdioma"
                  aria-describedby="nombreIdioma"
                  ref="nombreIdioma"
                />
              </div>
              <div class="col">
                <label for="origenId" class="form-label"
                  ><b>Id del Origen</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="origenId"
                  aria-describedby="origenId"
                  ref="origenId"
                />
              </div>
            </div>
            <div class="col-md-12 text-center my-2">
              <button
                type="submit"
                class="btn btn-success"
                @click="agregarIdioma"
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
                <label for="nombreIdioma" class="form-label"
                  ><b>Nombre del Idioma</b></label
                >
                <input
                  v-if="IdiomaActual"
                  type="text"
                  class="form-control"
                  id="nombreIdioma"
                  aria-describedby="nombreIdioma"
                  v-model="IdiomaActual.nombreidioma"
                />
              </div>
              <div class="col">
                <label for="origenId" class="form-label"
                  ><b>Id del Origen</b></label
                >
                <input
                  v-if="IdiomaActual"
                  type="text"
                  class="form-control"
                  id="origenId"
                  aria-describedby="origenId"
                  v-model="IdiomaActual.origenId"
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
          <table class="table table-dark table-striped" v-if="Idiomas">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre de Idioma</th>
                <th>Id del Origen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody v-if="Idiomas">
              <tr v-for="Idioma in Idiomas" :key="Idioma.id">
                <td>{{ Idioma.id }}</td>
                <td>{{ Idioma.nombreidioma}}</td>
                <td>{{ Idioma.origenId }}</td>
                <td>
                  <button class="btn btn-danger" @click="eliminar(Idioma.id)">
                    Eliminar
                  </button>
                  <button
                    class="btn btn-info"
                    @click="iniciarActualizacion(Idioma.id)"
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
  import { IIdioma } from "../Interface/IIdioma";
  import { Router } from "vue-router";
  
  @Options({
    props: {
      Idioma: Array,
    },
  })
  export default class Idioma extends Vue {
    mostrandoFormulario = false;
    actualizando = false;
    IdiomaActual: IIdioma | null = null;
    $router!: Router;
    redireccionar(event: Event) {
      const selectedOption = (event.target as HTMLSelectElement).value;
      if (selectedOption) {
        this.$router.push(selectedOption);
      }
    }
    Idiomas: Array<IIdioma> = [];
  
    mounted() {
      this.fetchData();
    }
  
    //Mostrar datos de la Base de datos
    fetchData() {
      fetch("http://localhost:3000/api/Idioma")
        .then((response) => response.json())
        .then((data: IIdioma[] | undefined) => {
          // Verificar si data es undefined antes de intentar ordenar
          if (data) {
            // Ordenar los idiomas por ID
            this.Idiomas = data.sort((a, b) => {
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
    async agregarIdioma() {
      try {
        const nombreIdiomaInput = this.$refs.nombreIdioma as HTMLInputElement;
        const origenIdInput = this.$refs.origenId as HTMLInputElement;
  
        if (
          !nombreIdiomaInput ||
          !origenIdInput
        ) {
          console.error(
            "Al menos uno de los campos del formulario no está presente."
          );
          return;
        }
  
        const nombreIdioma = parseInt(nombreIdiomaInput.value, 10);
        const origenId = parseInt(origenIdInput.value, 10);
  
        const response = await fetch("http://localhost:3000/api/Idioma", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombreIdioma,
            origenId: Number (origenId),
          }),
        });
  
        const data = await response.json();
        console.log(data);
  
        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } catch (error) {
        console.error("Error al agregar el Idioma:", error);
      }
    }
  
    //Eliminar
    async eliminar(id: number | undefined) {
      try {
        await fetch(`http://localhost:3000/api/Idioma/${id}`, {
          method: "DELETE",
        });
        // Actualizar la lista de idioma después de eliminar
        this.fetchData();
      } catch (error) {
        console.error("Error al eliminar el Idioma:", error);
      }
    }
    iniciarActualizacion(id: number | undefined) {
      if (id !== undefined) {
        this.actualizando = true;
        // Obtener datos del idioma para prellenar el formulario
        this.obtenerIdioma(id);
      }
    }
  
    async obtenerIdioma(id: number) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/Idioma/${id}`
        );
        const data = await response.json();
        if (
          typeof data.nombreIdioma === "string" &&
          !isNaN(Number(data.nombreIdioma))
        ) {
          data.nombreIdioma = Number(data.nombreIdioma);
        }
        this.IdiomaActual = data;
      } catch (error) {
        console.error("Error al obtener datos del Idioma:", error);
      }
    }
  
    async guardarActualizacion() {
      if (this.IdiomaActual) {
        const {
          id,
          nombreidioma,
          origenId,
        } = this.IdiomaActual;
        try {
          const response = await fetch(
            `http://localhost:3000/api/Idioma/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                
                nombreidioma,
                origenId: Number(origenId),
              }),
            }
          );
          const data = await response.json();
          console.log(data);
          // Terminar la actualización y recargar la página
          this.actualizando = false;
          location.reload();
        } catch (error) {
          console.error("Error al actualizar el Idioma:", error);
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
  
  