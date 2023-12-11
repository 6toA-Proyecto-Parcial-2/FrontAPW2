<template>
    <div class="col-md-12 text-center my-2">
      <div class="container my-4">
        <div class="mb-4">
          <select
            @change="redireccionar"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="">Nacionalidades</option>
            <option value="/">Generos</option>
            <option value="/autor">Autores</option>
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
                <label for="nombreciudad" class="form-label"
                  ><b>Nombre de la ciudad</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nombreciudad"
                  aria-describedby="nombreciudad"
                  ref="nombreciudad"
                />
              </div>
              <div class="col">
                <label for="AutorId" class="form-label"
                  ><b>Id del autor</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="AutorId"
                  aria-describedby="AutorId"
                  ref="AutorId"
                />
              </div>
            </div>

            <div class="col-md-12 text-center my-2">
              <button
                type="submit"
                class="btn btn-success"
                @click="agregarNacionalidad"
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
                  ><b>Nombre del pais</b></label
                >
                <input
                  v-if="nacionalidadActual"
                  type="text"
                  class="form-control"
                  id="nombrepais"
                  aria-describedby="nombrepais"
                  v-model="nacionalidadActual.nombrepais"
                />
              </div>
              <div class="col">
                <label for="nombreciudad" class="form-label"
                  ><b>Nombre de la ciudad</b></label
                >
                <input
                  v-if="nacionalidadActual"
                  type="text"
                  class="form-control"
                  id="nombreciudad"
                  aria-describedby="estado"
                  v-model="nacionalidadActual.nombreciudad"
                />
              </div>
              <div class="col">
                <label for="AutorId" class="form-label"
                  ><b>Id del autor</b></label
                >
                <input
                  v-if="nacionalidadActual"
                  type="text"
                  class="form-control"
                  id="AutorId"
                  aria-describedby="AutorId"
                  v-model="nacionalidadActual.AutorId"
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
          <table class="table table-dark table-striped" v-if="nacionalidades">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre del pais</th>
                <th>Nombre de la ciudad</th>
                <th>Id del autor</th>
                
              </tr>
            </thead>
            <tbody v-if="nacionalidades">
              <tr v-for="nacionalidad in nacionalidades" :key="nacionalidad.id">
                <td>{{ nacionalidad.id }}</td>
                <td>{{ nacionalidad.nombrepais }}</td>
                <td>{{ nacionalidad.nombreciudad }}</td>
                <td>{{ nacionalidad.AutorId }}</td>
                
                <td>
                  <button class="btn btn-danger" @click="eliminar(nacionalidad.id)">
                    Eliminar
                  </button>
                  <button
                    class="btn btn-info"
                    @click="iniciarActualizacion(nacionalidad.id)"
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
  import { INacionalidad } from "../Interface/INacionalidad";
  import { Router } from "vue-router";
  
  @Options({
    props: {
      nacionalidades: Array,
    },
  })
  export default class  Nacionalidades extends Vue {
    mostrandoFormulario = false;
    actualizando = false;
    nacionalidadActual: INacionalidad | null = null;
    $router!: Router;
    redireccionar(event: Event) {
      const selectedOption = (event.target as HTMLSelectElement).value;
      if (selectedOption) {
        this.$router.push(selectedOption);
      }
    }
    nacionalidades: Array<INacionalidad> = [];
  
    mounted() {
      this.fetchData();
    }
  
    //Mostrar datos de la Base de datos
    fetchData() {
      fetch("http://localhost:3000/api/Nacionalidades")
        .then((response) => response.json())
        .then((data: INacionalidad[] | undefined) => {
          // Verificar si data es undefined antes de intentar ordenar
          if (data) {
            // Ordenar los inventarios por ID
            this.nacionalidades = data.sort((a, b) => {
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
    async agregarNacionalidad() {
      try {
        const nombrepaisInput = this.$refs.nombrepais as HTMLInputElement;
        const nombreciudadInput = this.$refs.nombreciudad as HTMLInputElement;
        const AutorIdInput = this.$refs.AutorId as HTMLInputElement;
  
        if (
          !nombrepaisInput ||
          !nombreciudadInput ||
          !AutorIdInput
        ) {
          console.error(
            "Al menos uno de los campos del formulario no está presente."
          );
          return;
        }
  
        const nombrepais = nombrepaisInput.value;
        const nombreciudad = nombreciudadInput.value;
        const AutorId = parseInt(AutorIdInput.value, 10);
  
        const response = await fetch("http://localhost:3000/api/Nacionalidades", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombrepais,
            nombreciudad,
            AutorId: Number(AutorId),
          }),
        });
  
        const data = await response.json();
        console.log(data);
  
        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } catch (error) {
        console.error("Error al agregar el inventario:", error);
      }
    }
  
    //Eliminar
    async eliminar(id: number | undefined) {
      try {
        await fetch(`http://localhost:3000/api/Nacionalidades/${id}`, {
          method: "DELETE",
        });
        // Actualizar la lista de inventarios después de eliminar
        this.fetchData();
      } catch (error) {
        console.error("Error al eliminar la nacionalidad:", error);
      }
    }
    iniciarActualizacion(id: number | undefined) {
      if (id !== undefined) {
        this.actualizando = true;
        // Obtener datos de la nacionalidad para prellenar el formulario
        this.obtenernacionalidad(id);
      }
    }
  
    async obtenernacionalidad(id: number) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/Nacionalidades/${id}`
        );
        const data = await response.json();
        if (
          typeof data.AutorId === "string" &&
          !isNaN(Number(data.AutorId))
        ) {
          data.precioAlquiler = Number(data.AutorId);
        }
        this.nacionalidadActual = data;
      } catch (error) {
        console.error("Error al obtener datos de la nacionalidad:", error);
      }
    }
  
    async guardarActualizacion() {
      if (this.nacionalidadActual) {
        const {
          id,
          nombrepais,
          nombreciudad,
          AutorId,
          
        } = this.nacionalidadActual;
        try {
          const response = await fetch(
            `http://localhost:3000/api/Nacionalidades/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nombrepais,
                nombreciudad,
                AutorId: Number(AutorId),
              }),
            }
          );
          const data = await response.json();
          console.log(data);
          // Terminar la actualización y recargar la página
          this.actualizando = false;
          location.reload();
        } catch (error) {
          console.error("Error al actualizar la nacionalidads:", error);
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
  