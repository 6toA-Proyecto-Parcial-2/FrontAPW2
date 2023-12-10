<template>
  <div class="col-md-12 text-center my-2">
    <div class="container my-4">
      <div class="mb-4">
        <select
          @change="redireccionar"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="">Negocios</option>
          <option value="/encargado">Encargados</option>
          <option value="/inventario">Inventarios</option>
          <option value="#">Three</option>
        </select>
      </div>
      <div v-if="mostrandoFormulario">
        <form>
          <div class="row">
            <div class="col">
              <label for="correoNegocio" class="form-label"
                ><b>Correo del Negocio</b></label
              >
              <input
                type="text"
                class="form-control"
                id="correoNegocio"
                aria-describedby="correoNegocio"
                ref="correoNegocio"
              />
            </div>
            <div class="col">
              <label for="nombreNegocio" class="form-label"
                ><b>Nombre del Negocio</b></label
              >
              <input
                type="text"
                class="form-control"
                id="nombreNegocio"
                aria-describedby="nombreNegocio"
                ref="nombreNegocio"
              />
            </div>
            <div class="col">
              <label for="direccionNegocio" class="form-label"
                ><b>Direccion del Negocio</b></label
              >
              <input
                type="text"
                class="form-control"
                id="direccionNegocio"
                aria-describedby="direccionNegocio"
                ref="direccionNegocio"
              />
            </div>
            <div class="col">
              <label for="telefonoNegocio" class="form-label"
                ><b>Telefono del negocio</b></label
              >
              <input
                type="text"
                class="form-control"
                id="telefonoNegocio"
                aria-describedby="telefonoNegocio"
                ref="telefonoNegocio"
              />
            </div>
            <div class="col">
              <label for="totalLibros" class="form-label"
                ><b>Total de Libros</b></label
              >
              <input
                type="text"
                class="form-control"
                id="totalLibros"
                aria-describedby="totalLibros"
                ref="totalLibros"
              />
            </div>
          </div>
          <div class="col-md-12 text-center my-2">
            <button
              type="submit"
              class="btn btn-success"
              @click="agregarNegocio"
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
              <label for="correoNegocio" class="form-label"
                ><b>Correo del Negocio</b></label
              >
              <input
                v-if="negocioActual"
                type="text"
                class="form-control"
                id="correoNegocio"
                aria-describedby="correoNegocio"
                v-model="negocioActual.correoNegocio"
              />
            </div>
            <div class="col">
              <label for="nombreNegocio" class="form-label"
                ><b>Nombre del Negocio</b></label
              >
              <input
                v-if="negocioActual"
                type="text"
                class="form-control"
                id="nombreNegocio"
                aria-describedby="nombreNegocio"
                v-model="negocioActual.nombreNegocio"
              />
            </div>
            <div class="col">
              <label for="direccionNegocio" class="form-label"
                ><b>Direccion del Negocio</b></label
              >
              <input
                v-if="negocioActual"
                type="text"
                class="form-control"
                id="direccionNegocio"
                aria-describedby="direccionNegocio"
                v-model="negocioActual.direccionNegocio"
              />
            </div>
            <div class="col">
              <label for="telefonoNegocio" class="form-label"
                ><b>Telefono del negocio</b></label
              >
              <input
                v-if="negocioActual"
                type="text"
                class="form-control"
                id="telefonoNegocio"
                aria-describedby="telefonoNegocio"
                v-model="negocioActual.telefonoNegocio"
              />
            </div>
            <div class="col">
              <label for="totalLibros" class="form-label"
                ><b>Total de Libros</b></label
              >
              <input
                v-if="negocioActual"
                type="text"
                class="form-control"
                id="totalLibros"
                aria-describedby="totalLibros"
                v-model="negocioActual.totalLibros"
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
        <table class="table table-dark table-striped" v-if="negocios">
          <thead>
            <tr>
              <th>Id</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Total Libros</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody v-if="negocios">
            <tr v-for="negocio in negocios" :key="negocio.id">
              <td>{{ negocio.id }}</td>
              <td>{{ negocio.correoNegocio }}</td>
              <td>{{ negocio.nombreNegocio }}</td>
              <td>{{ negocio.direccionNegocio }}</td>
              <td>{{ negocio.telefonoNegocio }}</td>
              <td>{{ negocio.totalLibros }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminar(negocio.id)">
                  Eliminar
                </button>
                <button
                  class="btn btn-info"
                  @click="iniciarActualizacion(negocio.id)"
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
import { INegocio } from "../Interface/INegocio";
import { Router } from "vue-router";

@Options({
  props: {
    negocios: Array,
  },
})
export default class HelloWorld extends Vue {
  mostrandoFormulario = false;
  actualizando = false;
  negocioActual: INegocio | null = null;
  $router!: Router;
  redireccionar(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption) {
      this.$router.push(selectedOption);
    }
  }
  negocios: Array<INegocio> = [];

  mounted() {
    this.fetchData();
  }

  //Mostrar datos de la Base de datos
  fetchData() {
    fetch("http://localhost:3000/api/negocios")
      .then((response) => response.json())
      .then((data: INegocio[] | undefined) => {
        // Verificar si data es undefined antes de intentar ordenar
        if (data) {
          // Ordenar los negocios por ID
          this.negocios = data.sort((a, b) => {
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
  async agregarNegocio() {
    try {
      const correoNegocioInput = this.$refs.correoNegocio as HTMLInputElement;
      const nombreNegocioInput = this.$refs.nombreNegocio as HTMLInputElement;
      const direccionNegocioInput = this.$refs
        .direccionNegocio as HTMLInputElement;
      const telefonoNegocioInput = this.$refs
        .telefonoNegocio as HTMLInputElement;
      const totalLibrosInput = this.$refs.totalLibros as HTMLInputElement;

      if (
        !correoNegocioInput ||
        !nombreNegocioInput ||
        !direccionNegocioInput ||
        !telefonoNegocioInput ||
        !totalLibrosInput
      ) {
        console.error(
          "Al menos uno de los campos del formulario no está presente."
        );
        return;
      }

      const correoNegocio = correoNegocioInput.value;
      const nombreNegocio = nombreNegocioInput.value;
      const direccionNegocio = direccionNegocioInput.value;
      const telefonoNegocio = parseInt(telefonoNegocioInput.value, 10);
      const totalLibros = parseInt(totalLibrosInput.value, 10);
      const correoVerificado = await this.verificarCorreo(correoNegocio);

      if (correoVerificado) {
        // Si el correo está verificado, procede a agregar el negocio
        const response = await fetch("http://localhost:3000/api/negocios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correoNegocio,
            nombreNegocio,
            direccionNegocio,
            telefonoNegocio: Number(telefonoNegocio),
            totalLibros: Number(totalLibros),
          }),
        });

        const data = await response.json();
        console.log(data);

        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } else {
        // Si el correo no está verificado, muestra una alerta
        console.log("El correo ya está registrado");
      }
    } catch (error) {
      console.error("Error al agregar el negocio:", error);
    }
  }

  verificarCorreo(correo: string) {
    const correosRegistrados = this.negocios.map((negocio) =>
      negocio.correoNegocio.toLowerCase()
    );
    const correoExiste = correosRegistrados.includes(correo.toLowerCase());

    if (correoExiste) {
      // El correo ya está registrado
      alert("El correo ya está registrado.");
    } else {
      // El correo no está registrado
      alert("Registro Exitoso.");
    }

    // Devuelve true si el correo no existe y se puede proceder, false si ya existe.
    return !correoExiste;
  }

  //Eliminar
  async eliminar(id: number | undefined) {
    try {
      await fetch(`http://localhost:3000/api/negocios/${id}`, {
        method: "DELETE",
      });
      // Actualizar la lista de negocios después de eliminar
      this.fetchData();
    } catch (error) {
      console.error("Error al eliminar el negocio:", error);
    }
  }
  iniciarActualizacion(id: number | undefined) {
    if (id !== undefined) {
      this.actualizando = true;
      // Obtener datos del negocio para prellenar el formulario
      this.obtenerNegocio(id);
    }
  }

  async obtenerNegocio(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/api/negocios/${id}`);
      const data = await response.json();
      if (
        typeof data.telefonoNegocio === "string" &&
        !isNaN(Number(data.telefonoNegocio))
      ) {
        data.telefonoNegocio = Number(data.telefonoNegocio);
      }
      this.negocioActual = data;
    } catch (error) {
      console.error("Error al obtener datos del negocio:", error);
    }
  }

  async guardarActualizacion() {
    if (this.negocioActual) {
      const {
        id,
        correoNegocio,
        nombreNegocio,
        direccionNegocio,
        telefonoNegocio,
        totalLibros,
      } = this.negocioActual;
      try {
        const response = await fetch(
          `http://localhost:3000/api/negocios/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              correoNegocio,
              nombreNegocio,
              direccionNegocio,
              telefonoNegocio: Number(telefonoNegocio),
              totalLibros: Number(totalLibros),
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        // Terminar la actualización y recargar la página
        this.actualizando = false;
        location.reload();
      } catch (error) {
        console.error("Error al actualizar el negocio:", error);
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
