<template>
  <div class="col-md-12 text-center my-2">
    <div class="container my-4">
      <div class="mb-4">
        <select
          @change="redireccionar"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="">Categorias</option>
          <option value="/editoriales">Editoriales</option>
          <option value="/libros">Libros</option>
        </select>
      </div>
      <div v-if="mostrandoFormulario">
        <form>
          <div class="row">
            <div class="col">
              <label for="nombreCategoria" class="form-label"
                ><b>Nombre de la Categoria</b></label
              >
              <input
                type="text"
                class="form-control"
                id="nombreCategoria"
                aria-describedby="nombreCategoria"
                ref="nombreCategoria"
              />
            </div>
            <div class="col">
              <label for="CategoriaPrincipal" class="form-label"
                ><b>Categoria Principal</b></label
              >
              <input
                type="text"
                class="form-control"
                id="CategoriaPrincipal"
                aria-describedby="CategoriaPrincipal"
                ref="CategoriaPrincipal"
              />
            </div>
            <div class="col">
              <label for="librosId" class="form-label"><b>Libro Id</b></label>
              <input
                type="text"
                class="form-control"
                id="librosId"
                aria-describedby="librosId"
                ref="librosId"
              />
            </div>
          </div>
          <div class="col-md-12 text-center my-2">
            <button
              type="submit"
              class="btn btn-success"
              @click="agregarCategoria"
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
              <label for="nombreCategoria" class="form-label"
                ><b>Nombre de la Categoria</b></label
              >
              <input
                v-if="categoriaActual"
                type="text"
                class="form-control"
                id="nombreCategoria"
                aria-describedby="nombreCategoria"
                v-model="categoriaActual.nombreCategoria"
              />
            </div>
            <div class="col">
              <label for="CategoriaPrincipal" class="form-label"
                ><b>Categoria Principal</b></label
              >
              <input
                v-if="categoriaActual"
                type="text"
                class="form-control"
                id="CategoriaPrincipal"
                aria-describedby="CategoriaPrincipal"
                v-model="categoriaActual.CategoriaPrincipal"
              />
            </div>
            <div class="col">
              <label for="librosId" class="form-label"><b>Libro Id</b></label>
              <input
                v-if="categoriaActual"
                type="text"
                class="form-control"
                id="librosId"
                aria-describedby="librosId"
                v-model="categoriaActual.librosId"
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
        <table class="table table-dark table-striped" v-if="categorias">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre de la Categoria</th>
              <th>Categoria Principal</th>
              <th>Libro Id</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody v-if="categorias">
            <tr v-for="categoria in categorias" :key="categoria.id">
              <td>{{ categoria.id }}</td>
              <td>{{ categoria.nombreCategoria }}</td>
              <td>{{ categoria.CategoriaPrincipal }}</td>
              <td>{{ categoria.librosId }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminar(categoria.id)">
                  Eliminar
                </button>
                <button
                  class="btn btn-info"
                  @click="iniciarActualizacion(categoria.id)"
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
import { ICategoria } from "../Interface/ICategoria";
import { Router } from "vue-router";

@Options({
  props: {
    categorias: Array,
  },
})
export default class Categorias extends Vue {
  mostrandoFormulario = false;
  actualizando = false;
  categoriaActual: ICategoria | null = null;
  $router!: Router;
  redireccionar(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption) {
      this.$router.push(selectedOption);
    }
  }
  categorias: Array<ICategoria> = [];

  mounted() {
    this.fetchData();
  }

  //Mostrar datos de la Base de datos
  fetchData() {
    fetch("http://localhost:3000/api/categorias")
      .then((response) => response.json())
      .then((data: ICategoria[] | undefined) => {
        // Verificar si data es undefined antes de intentar ordenar
        if (data) {
          // Ordenar los categorias por ID
          this.categorias = data.sort((a, b) => {
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
  async agregarCategoria() {
    try {
      const nombreCategoriaInput = this.$refs
        .nombreCategoria as HTMLInputElement;
      const CategoriaPrincipalInput = this.$refs
        .CategoriaPrincipal as HTMLInputElement;
      const librosIdInput = this.$refs.librosId as HTMLInputElement;

      if (!nombreCategoriaInput || !CategoriaPrincipalInput || !librosIdInput) {
        console.error(
          "Al menos uno de los campos del formulario no está presente."
        );
        return;
      }

      const nombreCategoria = nombreCategoriaInput.value;
      const CategoriaPrincipal = CategoriaPrincipalInput.value;
      const librosId = Number(librosIdInput.value);
      const librosIdVerificado = await this.verificarlibrosId(librosId);

      if (librosIdVerificado) {
        // Si el correo está verificado, procede a agregar el negocio
        const response = await fetch("http://localhost:3000/api/categorias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombreCategoria,
            CategoriaPrincipal,
            librosId: Number(librosId),
          }),
        });

        const data = await response.json();
        console.log(data);

        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } else {
        // Si el correo no está verificado, muestra una alerta
        console.log("El libroId ya está registrado");
      }
    } catch (error) {
      console.error("Error al agregar la categoria:", error);
    }
  }

  verificarlibrosId(libroid: number) {
    const librosIdRegistrados = this.categorias.map(
      (categoria) => categoria.librosId
    );
    const libroIdExiste = librosIdRegistrados.includes(libroid);

    if (libroIdExiste) {
      // El libroId ya está registrado
      alert("El  libroId ya está registrado.");
    } else {
      // El correo no está registrado
      alert("Registro Exitoso.");
    }

    // Devuelve true si el correo no existe y se puede proceder, false si ya existe.
    return !libroIdExiste;
  }

  //Eliminar
  async eliminar(id: number | undefined) {
    try {
      await fetch(`http://localhost:3000/api/categorias/${id}`, {
        method: "DELETE",
      });
      // Actualizar la lista de categorias después de eliminar
      this.fetchData();
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
    }
  }
  iniciarActualizacion(id: number | undefined) {
    if (id !== undefined) {
      this.actualizando = true;
      // Obtener datos de la categoria para prellenar el formulario
      this.obtenerCategoria(id);
    }
  }

  async obtenerCategoria(id: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categorias/${id}`
      );
      const data = await response.json();
      if (typeof data.librosId === "string" && !isNaN(Number(data.librosId))) {
        data.librosId = Number(data.librosId);
      }
      this.categoriaActual = data;
    } catch (error) {
      console.error("Error al obtener datos del categoria:", error);
    }
  }

  async guardarActualizacion() {
    if (this.categoriaActual) {
      const { id, nombreCategoria, CategoriaPrincipal, librosId } =
        this.categoriaActual;
      try {
        const response = await fetch(
          `http://localhost:3000/api/categorias/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombreCategoria,
              CategoriaPrincipal,
              librosId: Number(librosId),
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
