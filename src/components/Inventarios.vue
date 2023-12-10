<template>
  <div class="col-md-12 text-center my-2">
    <div class="container my-4">
      <div class="mb-4">
        <select
          @change="redireccionar"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="">Inventarios</option>
          <option value="/">Negocios</option>
          <option value="/encargado">Encargados</option>
          <option value="#">Three</option>
        </select>
      </div>
      <div v-if="mostrandoFormulario">
        <form>
          <div class="row">
            <div class="col">
              <label for="numeroCopias" class="form-label"
                ><b>Numero de Copias</b></label
              >
              <input
                type="text"
                class="form-control"
                id="numeroCopias"
                aria-describedby="numeroCopias"
                ref="numeroCopias"
              />
            </div>
            <div class="col">
              <label for="estado" class="form-label"
                ><b>Estado del Libro</b></label
              >
              <input
                type="text"
                class="form-control"
                id="estado"
                aria-describedby="estado"
                ref="estado"
              />
            </div>
            <div class="col">
              <label for="precioVenta" class="form-label"
                ><b>Precio de Venta</b></label
              >
              <input
                type="text"
                class="form-control"
                id="precioVenta"
                aria-describedby="precioVenta"
                ref="precioVenta"
              />
            </div>
            <div class="col">
              <label for="precioAlquiler" class="form-label"
                ><b>Precio de Alquiler</b></label
              >
              <input
                type="text"
                class="form-control"
                id="precioAlquiler"
                aria-describedby="precioAlquiler"
                ref="precioAlquiler"
              />
            </div>
            <div class="col">
              <label for="encargadoId" class="form-label"
                ><b>Id del Encargado</b></label
              >
              <input
                type="text"
                class="form-control"
                id="encargadoId"
                aria-describedby="encargadoId"
                ref="encargadoId"
              />
            </div>
            <div class="col">
              <label for="negocioId" class="form-label"
                ><b>Id del Negocio</b></label
              >
              <input
                type="text"
                class="form-control"
                id="negocioId"
                aria-describedby="negocioId"
                ref="negocioId"
              />
            </div>
          </div>
          <div class="col-md-12 text-center my-2">
            <button
              type="submit"
              class="btn btn-success"
              @click="agregarInventario"
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
              <label for="numeroCopias" class="form-label"
                ><b>Numero de Copias</b></label
              >
              <input
                v-if="inventarioActual"
                type="text"
                class="form-control"
                id="numeroCopias"
                aria-describedby="numeroCopias"
                v-model="inventarioActual.numeroCopias"
              />
            </div>
            <div class="col">
              <label for="estado" class="form-label"
                ><b>Estado del Libro</b></label
              >
              <input
                v-if="inventarioActual"
                type="text"
                class="form-control"
                id="estado"
                aria-describedby="estado"
                v-model="inventarioActual.estado"
              />
            </div>
            <div class="col">
              <label for="precioVenta" class="form-label"
                ><b>Precio de Venta</b></label
              >
              <input
                v-if="inventarioActual"
                type="text"
                class="form-control"
                id="precioVenta"
                aria-describedby="precioVenta"
                v-model="inventarioActual.precioVenta"
              />
            </div>
            <div class="col">
              <label for="precioAlquiler" class="form-label"
                ><b>Precio de Alquiler</b></label
              >
              <input
                v-if="inventarioActual"
                type="text"
                class="form-control"
                id="precioAlquiler"
                aria-describedby="precioAlquiler"
                v-model="inventarioActual.precioAlquiler"
              />
            </div>
            <div class="col">
              <label for="encargadoId" class="form-label"
                ><b>Id del Encargado</b></label
              >
              <input
                v-if="inventarioActual"
                type="text"
                class="form-control"
                id="encargadoId"
                aria-describedby="encargadoId"
                v-model="inventarioActual.encargadoId"
              />
            </div>
            <div class="col">
              <label for="negocioId" class="form-label"
                ><b>Id del Negocio</b></label
              >
              <input
                v-if="inventarioActual"
                type="text"
                class="form-control"
                id="negocioId"
                aria-describedby="negocioId"
                v-model="inventarioActual.negocioId"
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
        <table class="table table-dark table-striped" v-if="inventarios">
          <thead>
            <tr>
              <th>Id</th>
              <th>Numero de Copias</th>
              <th>Estado</th>
              <th>Precio de Venta</th>
              <th>Precio de Alquiler</th>
              <th>Id del Encargado</th>
              <th>Id del Negocio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody v-if="inventarios">
            <tr v-for="inventario in inventarios" :key="inventario.id">
              <td>{{ inventario.id }}</td>
              <td>{{ inventario.numeroCopias }}</td>
              <td>{{ inventario.estado }}</td>
              <td>{{ inventario.precioVenta }}</td>
              <td>{{ inventario.precioAlquiler }}</td>
              <td>{{ inventario.encargadoId }}</td>
              <td>{{ inventario.negocioId }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminar(inventario.id)">
                  Eliminar
                </button>
                <button
                  class="btn btn-info"
                  @click="iniciarActualizacion(inventario.id)"
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
import { IInventario } from "../Interface/IInventario";
import { Router } from "vue-router";

@Options({
  props: {
    inventarios: Array,
  },
})
export default class Inventarios extends Vue {
  mostrandoFormulario = false;
  actualizando = false;
  inventarioActual: IInventario | null = null;
  $router!: Router;
  redireccionar(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption) {
      this.$router.push(selectedOption);
    }
  }
  inventarios: Array<IInventario> = [];

  mounted() {
    this.fetchData();
  }

  //Mostrar datos de la Base de datos
  fetchData() {
    fetch("http://localhost:3000/api/Inventarios")
      .then((response) => response.json())
      .then((data: IInventario[] | undefined) => {
        // Verificar si data es undefined antes de intentar ordenar
        if (data) {
          // Ordenar los inventarios por ID
          this.inventarios = data.sort((a, b) => {
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
  async agregarInventario() {
    try {
      const numeroCopiasInput = this.$refs.numeroCopias as HTMLInputElement;
      const estadoInput = this.$refs.estado as HTMLInputElement;
      const precioVentaInput = this.$refs.precioVenta as HTMLInputElement;
      const precioAlquilerInput = this.$refs.precioAlquiler as HTMLInputElement;
      const encargadoIdInput = this.$refs.encargadoId as HTMLInputElement;
      const negocioIdInput = this.$refs.negocioId as HTMLInputElement;

      if (
        !numeroCopiasInput ||
        !estadoInput ||
        !precioVentaInput ||
        !precioAlquilerInput ||
        !encargadoIdInput ||
        !negocioIdInput
      ) {
        console.error(
          "Al menos uno de los campos del formulario no está presente."
        );
        return;
      }

      const numeroCopias = parseInt(numeroCopiasInput.value, 10);
      const estado = estadoInput.value;
      const precioVenta = parseInt(precioVentaInput.value, 10);
      const precioAlquiler = parseInt(precioAlquilerInput.value, 10);
      const encargadoId = parseInt(encargadoIdInput.value, 10);
      const negocioId = parseInt(negocioIdInput.value, 10);

      const response = await fetch("http://localhost:3000/api/Inventarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeroCopias: Number(numeroCopias),
          estado,
          precioVenta: Number(precioVenta),
          precioAlquiler: Number(precioAlquiler),
          encargadoId: Number(encargadoId),
          negocioId: Number(negocioId),
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
      await fetch(`http://localhost:3000/api/Inventarios/${id}`, {
        method: "DELETE",
      });
      // Actualizar la lista de inventarios después de eliminar
      this.fetchData();
    } catch (error) {
      console.error("Error al eliminar el inventario:", error);
    }
  }
  iniciarActualizacion(id: number | undefined) {
    if (id !== undefined) {
      this.actualizando = true;
      // Obtener datos del inventario para prellenar el formulario
      this.obtenerinventario(id);
    }
  }

  async obtenerinventario(id: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/Inventarios/${id}`
      );
      const data = await response.json();
      if (
        typeof data.precioAlquiler === "string" &&
        !isNaN(Number(data.precioAlquiler))
      ) {
        data.precioAlquiler = Number(data.precioAlquiler);
      }
      this.inventarioActual = data;
    } catch (error) {
      console.error("Error al obtener datos del inventario:", error);
    }
  }

  async guardarActualizacion() {
    if (this.inventarioActual) {
      const {
        id,
        numeroCopias,
        estado,
        precioVenta,
        precioAlquiler,
        encargadoId,
        negocioId,
      } = this.inventarioActual;
      try {
        const response = await fetch(
          `http://localhost:3000/api/Inventarios/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numeroCopias: Number(numeroCopias),
              estado,
              precioVenta: Number(precioVenta),
              precioAlquiler: Number(precioAlquiler),
              encargadoId: Number(encargadoId),
              negocioId: Number(negocioId),
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        // Terminar la actualización y recargar la página
        this.actualizando = false;
        location.reload();
      } catch (error) {
        console.error("Error al actualizar el inventario:", error);
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
