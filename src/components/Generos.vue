<template>
    <div class="col-md-12 text-center my-2">
      <div class="container my-4">
        <div class="mb-4">
          <select
            @change="redireccionar"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="">Generos</option>
            <option value="/">Nacionalidades</option>
            <option value="/autor">Autores</option>
            <option value="#">Three</option>
          </select>
        </div>
        <div v-if="mostrandoFormulario">
          <form>
            <div class="row">
              <div class="col">
                <label for="generoliterario" class="form-label"
                  ><b>Genero literario</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="generoliterario"
                  aria-describedby="generoliterario"
                  ref="generoliterario"
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
                @click="agregarGenero"
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
                <label for="generoliterario" class="form-label"
                  ><b>Genero literario</b></label
                >
                <input
                  v-if="generoActual"
                  type="text"
                  class="form-control"
                  id="generoliterario"
                  aria-describedby="generoliterario"
                  v-model="generoActual.generoliterario"
                />
                  </div>
              <div class="col">
                <label for="AutorId" class="form-label"
                  ><b>Id del autor</b></label
                >
                <input
                  v-if="generoActual"
                  type="text"
                  class="form-control"
                  id="estado"
                  aria-describedby="estado"
                  v-model="generoActual.AutorId"
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
          <table class="table table-dark table-striped" v-if="generos">
            <thead>
              <tr>
                <th>Id</th>
                <th>Genero literario</th>
                <th>Id del autor</th>
              </tr>
            </thead>
            <tbody v-if="generos">
              <tr v-for="genero in generos" :key="genero.id">
                <td>{{genero.id }}</td>
                <td>{{ genero.generoliterario }}</td>
                <td>{{ genero.AutorId}}</td>
                <td>
                  <button class="btn btn-danger" @click="eliminar(genero.id)">
                    Eliminar
                  </button>
                  <button
                    class="btn btn-info"
                    @click="iniciarActualizacion(genero.id)"
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
  import { IGenero } from "../Interface/IGenero";
  import { Router } from "vue-router";
  
  @Options({
    props: {
      generos: Array,
    },
  })
  export default class Generos extends Vue {
    mostrandoFormulario = false;
    actualizando = false;
    generoActual: IGenero | null = null;
    $router!: Router;
    redireccionar(event: Event) {
      const selectedOption = (event.target as HTMLSelectElement).value;
      if (selectedOption) {
        this.$router.push(selectedOption);
      }
    }
    generos: Array<IGenero> = [];
  
    mounted() {
      this.fetchData();
    }
  
    //Mostrar datos de la Base de datos
    fetchData() {
      fetch("http://localhost:3000/api/Generos")
        .then((response) => response.json())
        .then((data: IGenero[] | undefined) => {
          // Verificar si data es undefined antes de intentar ordenar
          if (data) {
            // Ordenar los inventarios por ID
            this.generos = data.sort((a, b) => {
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
    async agregarGenero() {
      try {
        const generoliterarioInput = this.$refs.generoliterario as HTMLInputElement;
        const AutorIdInput = this.$refs.AutorId as HTMLInputElement;
  
        if (
          !generoliterarioInput ||
          !AutorIdInput ||
          
        ) {
          console.error(
            "Al menos uno de los campos del formulario no está presente."
          );
          return;
        }
  
        const generoliterario = generoliterarioInput.value;
        const AutorId = parseInt(AutorIdInput.value, 10);
  
        const response = await fetch("http://localhost:3000/api/Generos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            generoliterario,
            AutorId: Number(AutorId),
          }),
        });
  
        const data = await response.json();
        console.log(data);
  
        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } catch (error) {
        console.error("Error al agregar el genero:", error);
      }
    }
  
    //Eliminar
    async eliminar(id: number | undefined) {
      try {
        await fetch(`http://localhost:3000/api/Generos/${id}`, {
          method: "DELETE",
        });
        // Actualizar la lista de inventarios después de eliminar
        this.fetchData();
      } catch (error) {
        console.error("Error al eliminar el genero:", error);
      }
    }
    iniciarActualizacion(id: number | undefined) {
      if (id !== undefined) {
        this.actualizando = true;
        // Obtener datos del inventario para prellenar el formulario
        this.obtenergenero(id);
      }
    }
  
    async obtenergenero(id: number) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/Generos/${id}`
        );
        const data = await response.json();
        if (
          typeof data.generoliterario === "string" &&
          !isNaN(Number(data.generoliterario))
        ) {
          data.generoliterario = Number(data.generoliterario);
        }
        this.generoActual = data;
      } catch (error) {
        console.error("Error al obtener datos del genero:", error);
      }
    }
  
    async guardarActualizacion() {
      if (this.generoActual) {
        const {
          id,
          generoliterario,
          AutorId,
        } = this.generoActual;
        try {
          const response = await fetch(
            `http://localhost:3000/api/Generos/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                generoliterario,
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
          console.error("Error al actualizar el genero:", error);
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
  