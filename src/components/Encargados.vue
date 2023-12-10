<template>
  <div class="col-md-12 text-center my-2">
    <div class="container my-4">
      <div class="mb-4">
        <select
          @change="redireccionar"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="">Encargados</option>
          <option value="/">Negocios</option>
          <option value="/inventario">Inventarios</option>
          <option value="#">Three</option>
        </select>
      </div>
      <div v-if="mostrandoFormulario">
        <form>
          <div class="row">
            <div class="col">
              <label for="correoEncargado" class="form-label"
                ><b>Correo del encargado</b></label
              >
              <input
                type="text"
                class="form-control"
                id="correoEncargado"
                aria-describedby="correoEncargado"
                ref="correoEncargado"
              />
            </div>
            <div class="col">
              <label for="nombreEncargado" class="form-label"
                ><b>Nombre del encargado</b></label
              >
              <input
                type="text"
                class="form-control"
                id="nombreEncargado"
                aria-describedby="nombreEncargado"
                ref="nombreEncargado"
              />
            </div>
            <div class="col">
              <label for="telefonoEncargado" class="form-label"
                ><b>Telefono del encargado</b></label
              >
              <input
                type="text"
                class="form-control"
                id="telefonoEncargado"
                aria-describedby="telefonoEncargado"
                ref="telefonoEncargado"
              />
            </div>
          </div>
          <div class="col-md-12 text-center my-2">
            <button
              type="submit"
              class="btn btn-success"
              @click="agregarEncargado"
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
              <label for="correoEncargado" class="form-label"
                ><b>Correo del encargado</b></label
              >
              <input
                v-if="encargadoActual"
                type="text"
                class="form-control"
                id="correoEncargado"
                aria-describedby="correoEncargado"
                v-model="encargadoActual.correoEncargado"
              />
            </div>
            <div class="col">
              <label for="nombreEncargado" class="form-label"
                ><b>Nombre del encargado</b></label
              >
              <input
                v-if="encargadoActual"
                type="text"
                class="form-control"
                id="nombreEncargado"
                aria-describedby="nombreEncargado"
                v-model="encargadoActual.nombreEncargado"
              />
            </div>
            <div class="col">
              <label for="telefonoEncargado" class="form-label"
                ><b>Telefono del encargado</b></label
              >
              <input
                v-if="encargadoActual"
                type="text"
                class="form-control"
                id="telefonoEncargado"
                aria-describedby="telefonoEncargado"
                v-model="encargadoActual.telefonoEncargado"
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
        <table class="table table-dark table-striped" v-if="encargados">
          <thead>
            <tr>
              <th>Id</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody v-if="encargados">
            <tr v-for="encargado in encargados" :key="encargado.id">
              <td>{{ encargado.id }}</td>
              <td>{{ encargado.correoEncargado }}</td>
              <td>{{ encargado.nombreEncargado }}</td>
              <td>{{ encargado.telefonoEncargado }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminar(encargado.id)">
                  Eliminar
                </button>
                <button
                  class="btn btn-info"
                  @click="iniciarActualizacion(encargado.id)"
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
import { IEncargado } from "../Interface/IEncargado";
import { Router } from "vue-router";

@Options({
  props: {
    encargados: Array,
  },
})
export default class Encargados extends Vue {
  mostrandoFormulario = false;
  actualizando = false;
  encargadoActual: IEncargado | null = null;
  $router!: Router;
  redireccionar(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption) {
      this.$router.push(selectedOption);
    }
  }
  encargados: Array<IEncargado> = [];

  mounted() {
    this.fetchData();
  }

  //Mostrar datos de la Base de datos
  fetchData() {
    fetch("http://localhost:3000/api/encargados")
      .then((response) => response.json())
      .then((data: IEncargado[] | undefined) => {
        // Verificar si data es undefined antes de intentar ordenar
        if (data) {
          // Ordenar los encargados por ID
          this.encargados = data.sort((a, b) => {
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
  async agregarEncargado() {
    try {
      const correoEncargadoInput = this.$refs
        .correoEncargado as HTMLInputElement;
      const nombreEncargadoInput = this.$refs
        .nombreEncargado as HTMLInputElement;
      const telefonoEncargadoInput = this.$refs
        .telefonoEncargado as HTMLInputElement;

      if (
        !correoEncargadoInput ||
        !nombreEncargadoInput ||
        !telefonoEncargadoInput
      ) {
        console.error(
          "Al menos uno de los campos del formulario no está presente."
        );
        return;
      }

      const correoEncargado = correoEncargadoInput.value;
      const nombreEncargado = nombreEncargadoInput.value;
      const telefonoEncargado = parseInt(telefonoEncargadoInput.value, 10);
      const correoVerificado = await this.verificarCorreo(correoEncargado);

      if (correoVerificado) {
        // Si el correo está verificado, procede a agregar el encargado
        const response = await fetch("http://localhost:3000/api/encargados", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correoEncargado,
            nombreEncargado,
            telefonoEncargado: Number(telefonoEncargado),
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
      console.error("Error al agregar el encargado:", error);
    }
  }

  verificarCorreo(correo: string) {
    const correosRegistrados = this.encargados.map((encargado) =>
      encargado.correoEncargado.toLowerCase()
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
      await fetch(`http://localhost:3000/api/encargados/${id}`, {
        method: "DELETE",
      });
      // Actualizar la lista de encargados después de eliminar
      this.fetchData();
    } catch (error) {
      console.error("Error al eliminar el encargado:", error);
    }
  }
  iniciarActualizacion(id: number | undefined) {
    if (id !== undefined) {
      this.actualizando = true;
      // Obtener datos del encargado para prellenar el formulario
      this.obtenerEncargado(id);
    }
  }

  async obtenerEncargado(id: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/encargados/${id}`
      );
      const data = await response.json();
      if (
        typeof data.telefonoEncargado === "string" &&
        !isNaN(Number(data.telefonoEncargado))
      ) {
        data.telefonoEncargado = Number(data.telefonoEncargado);
      }
      this.encargadoActual = data;
    } catch (error) {
      console.error("Error al obtener datos del Encargado:", error);
    }
  }

  async guardarActualizacion() {
    if (this.encargadoActual) {
      const { id, correoEncargado, nombreEncargado, telefonoEncargado } =
        this.encargadoActual;
      try {
        const response = await fetch(
          `http://localhost:3000/api/encargados/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              correoEncargado,
              nombreEncargado,
              telefonoEncargado: Number(telefonoEncargado),
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        // Terminar la actualización y recargar la página
        this.actualizando = false;
        location.reload();
      } catch (error) {
        console.error("Error al actualizar el encargado:", error);
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
