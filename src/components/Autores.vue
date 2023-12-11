<template>
    <div class="col-md-12 text-center my-2">
      <div class="container my-4">
        <div class="mb-4">
          <select
            @change="redireccionar"
            class="form-select"
            aria-label="Default select example"
          >
            <option value="">Autores</option>
            <option value="/">Generos</option>
            <option value="/nacionalidad">Nacionalidades</option>
            <option value="#">Three</option>
          </select>
        </div>
        <div v-if="mostrandoFormulario">
          <form>
            <div class="row">
              <div class="col">
                <label for="cedulautor" class="form-label"
                  ><b>Cédula del autor</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="cedulautor"
                  aria-describedby="cedulautor"
                  ref="cedulautor"
                />
              </div>

              <div class="col">
                <label for="correoautor" class="form-label"
                  ><b>correo del autor</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="correoautor"
                  aria-describedby="correoautor"
                  ref="correoautor"
                />
              </div>

              <div class="col">
                <label for="nombreautor" class="form-label"
                  ><b>Nombre del autor</b></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nombreautor"
                  aria-describedby="nombreautor"
                  ref="nombreautor"
                />
              </div>
            </div>

            <div class="col-md-12 text-center my-2">
              <button
                type="submit"
                class="btn btn-success"
                @click="agregarAutor"
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
                <label for="cedulautor" class="form-label"
                  ><b>Cedula del autor</b></label
                >
                <input
                  v-if="autorActual"
                  type="text"
                  class="form-control"
                  id="cedulautor"
                  aria-describedby="cedulautor"
                  v-model="autorActual.cedulautor"
                />
              </div>

              <div class="col">
                <label for="correoautor" class="form-label"
                  ><b>Correo del autor</b></label
                >
                <input
                  v-if="autorActual"
                  type="text"
                  class="form-control"
                  id="correoautor"
                  aria-describedby="correoautor"
                  v-model="autorActual.correoautor"
                />
              </div>

              <div class="col">
                <label for="nombreautor" class="form-label"
                  ><b>Nombre del autor</b></label
                >
                <input
                  v-if="autorActual"
                  type="text"
                  class="form-control"
                  id="nombreautor"
                  aria-describedby="nombreautor"
                  v-model="autorActual.nombreautor"
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
          <table class="table table-dark table-striped" v-if="autores">
            <thead>
              <tr>
                <th>Id</th>
                <th>cedula autor</th>
                <th>correo autor</th>
                <th>nombre autor</th>
                
              </tr>
            </thead>
            <tbody v-if="autores">
              <tr v-for="autor in autores" :key="autor.id">
                <td>{{ autor.id }}</td>
                <td>{{ autor.cedulautor }}</td>
                <td>{{ autor.correoautor }}</td>
                <td>{{ autor.nombreautor }}</td>
                
                <td>
                  <button class="btn btn-danger" @click="eliminar(autor.id)">
                    Eliminar
                  </button>
                  <button
                    class="btn btn-info"
                    @click="iniciarActualizacion(autor.id)"
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
  import { IAutor } from "../Interface/IAutor";
  import { Router } from "vue-router";
  
  @Options({
    props: {
      autores: Array,
    },
  })
  export default class Autores extends Vue {
    mostrandoFormulario = false;
    actualizando = false;
    autorActual: IAutor | null = null;
    $router!: Router;
    redireccionar(event: Event) {
      const selectedOption = (event.target as HTMLSelectElement).value;
      if (selectedOption) {
        this.$router.push(selectedOption);
      }
    }
    autores: Array<IAutor> = [];
  
    mounted() {
      this.fetchData();
    }
  
    //Mostrar datos de la Base de datos
    fetchData() {
      fetch("http://localhost:3000/api/Autores")
        .then((response) => response.json())
        .then((data: IAutor[] | undefined) => {
          // Verificar si data es undefined antes de intentar ordenar
          if (data) {
            // Ordenar los inventarios por ID
            this.autores = data.sort((a, b) => {
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
    async agregarAutor() {
      try {
        const cedulautorInput = this.$refs.cedulautor as HTMLInputElement;
        const correoautorInput = this.$refs.correoautor as HTMLInputElement;
        const nombreautorInput = this.$refs.nombreautor as HTMLInputElement;
        
        if (
          !cedulautorInput ||
          !correoautorInput ||
          !nombreautorInput ||
          
        ) {
          console.error(
            "Al menos uno de los campos del formulario no está presente."
          );
          return;
        }
  
        const cedulautor = parseInt(cedulautorInput.value, 10);
        const correoautor = correoautorInput.value;
        const nombreautor = parseInt(nombreautorInput.value, 10);
  
        const response = await fetch("http://localhost:3000/api/Autores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cedulautor,
            correoautor,
            nombreautor,
          }),
        });
  
        const data = await response.json();
        console.log(data);
  
        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } catch (error) {
        console.error("Error al agregar el autor:", error);
      }
    }
  
    //Eliminar
    async eliminar(id: number | undefined) {
      try {
        await fetch(`http://localhost:3000/api/Autores/${id}`, {
          method: "DELETE",
        });
        // Actualizar la lista de inventarios después de eliminar
        this.fetchData();
      } catch (error) {
        console.error("Error al eliminar el autor:", error);
      }
    }
    iniciarActualizacion(id: number | undefined) {
      if (id !== undefined) {
        this.actualizando = true;
        // Obtener datos del inventario para prellenar el formulario
        this.obtenerautor(id);
      }
    }
  
    async obtenerautor(id: number) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/Autores/${id}`
        );
        const data = await response.json();
        if (
          typeof data.nombreautor === "string" &&
          !isNaN(Number(data.nombreautor))
        ) {
          data.nombreautor = Number(data.nombreautor);
        }
        this.autorActual = data;
      } catch (error) {
        console.error("Error al obtener datos del inventario:", error);
      }
    }
  
    async guardarActualizacion() {
      if (this.autorActual) {
        const {
          id,
          cedulautor,
          correoautor,
          nombreautor,
          
        } = this.autorActual;
        try {
          const response = await fetch(
            `http://localhost:3000/api/Autores/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cedulautor,
                correoautor,
                nombreautor,
              }),
            }
          );
          const data = await response.json();
          console.log(data);
          // Terminar la actualización y recargar la página
          this.actualizando = false;
          location.reload();
        } catch (error) {
          console.error("Error al actualizar el autor:", error);
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
  