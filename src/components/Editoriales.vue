<template>
  <div class="col-md-12 text-center my-2">
    <div class="container my-4">
      <div class="mb-4">
        <select
          @change="redireccionar"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="">Editorial</option>
          <option value="/libros">Libros</option>
          <option value="/categorias">Categorias</option>
        </select>
      </div>
      <div v-if="mostrandoFormulario">
        <form>
          <div class="row">
            <div class="col">
              <label for="nombreEditorial" class="form-label"
                ><b>nombre del Editorial</b></label
              >
              <input
                type="text"
                class="form-control"
                id="nombreEditorial"
                aria-describedby="nombreEditorial"
                ref="nombreEditorial"
              />
            </div>
            <div class="col">
              <label for="correoEditorial" class="form-label"
                ><b>Correo del Editorial</b></label
              >
              <input
                type="text"
                class="form-control"
                id="correoEditorial"
                aria-describedby="correoEditorial"
                ref="correoEditorial"
              />
            </div>
            <div class="col">
              <label for="direccionEditorial" class="form-label"
                ><b>Direccion del Editorial</b></label
              >
              <input
                type="text"
                class="form-control"
                id="direccionEditorial"
                aria-describedby="direccionEditorial"
                ref="direccionEditorial"
              />
            </div>
            <div class="col">
              <label for="telefonoEditorial" class="form-label"
                ><b>Telefono del Editorial</b></label
              >
              <input
                type="text"
                class="form-control"
                id="telefonoEditorial"
                aria-describedby="telefonoEditorial"
                ref="telefonoEditorial"
              />
            </div>
            <div class="col">
              <label for="libroId" class="form-label"><b>Libro Id</b></label>
              <input
                type="text"
                class="form-control"
                id="libroId"
                aria-describedby="libroId"
                ref="libroId"
              />
            </div>
          </div>
          <div class="col-md-12 text-center my-2">
            <button
              type="submit"
              class="btn btn-success"
              @click="agregarEditorial"
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
              <label for="nombreEditorial" class="form-label"
                ><b>Nombre del Editorial</b></label
              >
              <input
                v-if="editorialActual"
                type="text"
                class="form-control"
                id="nombreEditorial"
                aria-describedby="nombreEditorial"
                v-model="editorialActual.nombreEditorial"
              />
            </div>
            <div class="col">
              <label for="cooreoEditorial" class="form-label"
                ><b>Correo del Editorial</b></label
              >
              <input
                v-if="editorialActual"
                type="text"
                class="form-control"
                id="correoEditorial"
                aria-describedby="cooreoEditorial"
                v-model="editorialActual.correoEditorial"
              />
            </div>
            <div class="col">
              <label for="direccionEditorial" class="form-label"
                ><b>Direccion del Editorial</b></label
              >
              <input
                v-if="editorialActual"
                type="text"
                class="form-control"
                id="direccionEditorial"
                aria-describedby="direccionEditorial"
                v-model="editorialActual.direccionEditorial"
              />
            </div>
            <div class="col">
              <label for="telefonoEditorial" class="form-label"
                ><b>Telefono del Libro</b></label
              >
              <input
                v-if="editorialActual"
                type="text"
                class="form-control"
                id="telefonoEditorial"
                aria-describedby="telefonoEditorial"
                v-model="editorialActual.telefonoEditorial"
              />
            </div>
            <div class="col">
              <label for="libroId" class="form-label"><b>Libro Id </b></label>
              <input
                v-if="editorialActual"
                type="text"
                class="form-control"
                id="libroId"
                aria-describedby="libroId"
                v-model="editorialActual.libroId"
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
        <table class="table table-dark table-striped" v-if="editoriales">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre del Editorial</th>
              <th>Correo del Editorial</th>
              <th>Direccion del Editorial</th>
              <th>Telefono del Editorial</th>
              <th>Libro Id</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody v-if="editoriales">
            <tr v-for="editorial in editoriales" :key="editorial.id">
              <td>{{ editorial.id }}</td>
              <td>{{ editorial.nombreEditorial }}</td>
              <td>{{ editorial.correoEditorial }}</td>
              <td>{{ editorial.direccionEditorial }}</td>
              <td>{{ editorial.telefonoEditorial }}</td>
              <td>{{ editorial.libroId }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminar(editorial.id)">
                  Eliminar
                </button>
                <button
                  class="btn btn-info"
                  @click="iniciarActualizacion(editorial.id)"
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
import { IEditorial } from "../Interface/IEditorial";
import { Router } from "vue-router";

@Options({
  props: {
    editoriales: Array,
  },
})
export default class Editoriales extends Vue {
  mostrandoFormulario = false;
  actualizando = false;
  editorialActual: IEditorial | null = null;
  $router!: Router;
  redireccionar(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption) {
      this.$router.push(selectedOption);
    }
  }
  editoriales: Array<IEditorial> = [];

  mounted() {
    this.fetchData();
  }

  //Mostrar datos de la Base de datos
  fetchData() {
    fetch("http://localhost:3000/api/editoriales")
      .then((response) => response.json())
      .then((data: IEditorial[] | undefined) => {
        // Verificar si data es undefined antes de intentar ordenar
        if (data) {
          // Ordenar los editoriales por ID
          this.editoriales = data.sort((a, b) => {
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

  //Mostrar el formulario para agregar
  mostrarFormulario() {
    this.mostrandoFormulario = true;
  }
  //Agregar Datos en la Base de datos
  async agregarEditorial() {
    try {
      const nombreEditorialInput = this.$refs
        .nombreEditorial as HTMLInputElement;
      const correoEditorialInput = this.$refs
        .correoEditorial as HTMLInputElement;
      const direccionEditorialInput = this.$refs
        .direccionEditorial as HTMLInputElement;
      const telefonoEditorialInput = this.$refs
        .telefonoEditorial as HTMLInputElement;
      const libroIdInput = this.$refs.libroId as HTMLInputElement;

      if (
        !nombreEditorialInput ||
        !correoEditorialInput ||
        !direccionEditorialInput ||
        !telefonoEditorialInput ||
        !libroIdInput
      ) {
        console.error(
          "Al menos uno de los campos del formulario no está presente."
        );
        return;
      }

      const nombreEditorial = nombreEditorialInput.value;
      const correoEditorial = correoEditorialInput.value;
      const direccionEditorial = direccionEditorialInput.value;
      const telefonoEditorial = Number(telefonoEditorialInput.value);
      const libroId = Number(libroIdInput.value);

      // Si el ISBN está verificado, procede a agregar el libro
      const response = await fetch("http://localhost:3000/api/editoriales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreEditorial,
          correoEditorial,
          direccionEditorial,
          telefonoEditorial,
          libroId,
        }),
      });

      const data = await response.json();
      console.log(data);

      // Terminar la operación y recargar la página
      this.mostrandoFormulario = false;
      location.reload();
      alert("Registro Exitoso.");
    } catch (error) {
      console.error("Error al agregar el editorial:", error);
    }
  }

  //Eliminar
  async eliminar(id: number | undefined) {
    try {
      await fetch(`http://localhost:3000/api/editoriales/${id}`, {
        method: "DELETE",
      });
      // Actualizar la lista de editoriales después de eliminar
      this.fetchData();
    } catch (error) {
      console.error("Error al eliminar el editorial:", error);
    }
  }
  iniciarActualizacion(id: number | undefined) {
    if (id !== undefined) {
      this.actualizando = true;
      // Obtener datos del libro para prellenar el formulario
      this.obtenerCategoria(id);
    }
  }

  async obtenerCategoria(id: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/editoriales/${id}`
      );
      const data = await response.json();
      if (typeof data.libroId === "string" && !isNaN(Number(data.libroId))) {
        data.libroId = Number(data.libroId);
      }
      this.editorialActual = data;
    } catch (error) {
      console.error("Error al obtener datos del Libro:", error);
    }
  }

  async guardarActualizacion() {
    if (this.editorialActual) {
      const {
        id,
        nombreEditorial,
        correoEditorial,
        direccionEditorial,
        telefonoEditorial,
        libroId,
      } = this.editorialActual;
      try {
        const response = await fetch(
          `http://localhost:3000/api/editoriales/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombreEditorial,
              correoEditorial,
              direccionEditorial,
              telefonoEditorial: Number(telefonoEditorial),
              libroId: Number(libroId),
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        // Terminar la actualización y recargar la página
        this.actualizando = false;
        location.reload();
      } catch (error) {
        console.error("Error al actualizar la categoria:", error);
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
