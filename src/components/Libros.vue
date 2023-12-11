<template>
  <div class="col-md-12 text-center my-2">
    <div class="container my-4">
      <div class="mb-4">
        <select
          @change="redireccionar"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="">Libros</option>
          <option value="/editoriales">Editoriales</option>
          <option value="/categorias">Categorias</option>
        </select>
      </div>
      <div v-if="mostrandoFormulario">
        <form>
          <div class="row">
            <div class="col">
              <label for="ISBN" class="form-label"><b>ISBN</b></label>
              <input
                type="text"
                class="form-control"
                id="ISBN"
                aria-describedby="ISBN"
                ref="ISBN"
              />
            </div>
            <div class="col">
              <label for="nombreLibro" class="form-label"
                ><b>Nombre del Libro</b></label
              >
              <input
                type="text"
                class="form-control"
                id="nombreLibro"
                aria-describedby="nombreLibro"
                ref="nombreLibro"
              />
            </div>
            <div class="col">
              <label for="anopublicacion" class="form-label"
                ><b>Año de publicacion</b></label
              >
              <input
                type="text"
                class="form-control"
                id="anopublicacion"
                aria-describedby="anopublicacion"
                ref="anopublicacion"
              />
            </div>
            <div class="col">
              <label for="edicionLibro" class="form-label"
                ><b>Edicion del Libro</b></label
              >
              <input
                type="text"
                class="form-control"
                id="edicionLibro"
                aria-describedby="edicionLibro"
                ref="edicionLibro"
              />
            </div>
            <div class="col">
              <label for="clasificacionLibro" class="form-label"
                ><b>Clasificacion del Libro</b></label
              >
              <input
                type="text"
                class="form-control"
                id="clasificacionLibro"
                aria-describedby="clasificacionLibro"
                ref="clasificacionLibro"
              />
            </div>
          </div>
          <div class="col-md-12 text-center my-2">
            <button type="submit" class="btn btn-success" @click="agregarLibro">
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
              <label for="ISBN" class="form-label"><b>ISBN</b></label>
              <input
                v-if="libroActual"
                type="text"
                class="form-control"
                id="ISBN"
                aria-describedby="ISBN"
                v-model="libroActual.ISBN"
              />
            </div>
            <div class="col">
              <label for="nombreLibro" class="form-label"
                ><b>Nombre del Libro</b></label
              >
              <input
                v-if="libroActual"
                type="text"
                class="form-control"
                id="nombreLibro"
                aria-describedby="nombreLibro"
                v-model="libroActual.nombreLibro"
              />
            </div>
            <div class="col">
              <label for="anopublicacion" class="form-label"
                ><b>Año de Publicacion</b></label
              >
              <input
                v-if="libroActual"
                type="text"
                class="form-control"
                id="anopublicacion"
                aria-describedby="anopublicacion"
                v-model="libroActual.anopublicacion"
              />
            </div>
            <div class="col">
              <label for="edicionLibro" class="form-label"
                ><b>Edicion del Libro</b></label
              >
              <input
                v-if="libroActual"
                type="text"
                class="form-control"
                id="edicionLibro"
                aria-describedby="edicionLibro"
                v-model="libroActual.edicionLibro"
              />
            </div>
            <div class="col">
              <label for="clasificacionLibro" class="form-label"
                ><b>Clasificacion del Libro</b></label
              >
              <input
                v-if="libroActual"
                type="text"
                class="form-control"
                id="clasificacionLibro"
                aria-describedby="clasificacionLibro"
                v-model="libroActual.clasificacionLibro"
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
        <table class="table table-dark table-striped" v-if="libros">
          <thead>
            <tr>
              <th>Id</th>
              <th>ISBN</th>
              <th>Nombre del Libro</th>
              <th>Año de Publicacion</th>
              <th>Edicion del Libro</th>
              <th>Clasificacion del Libro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody v-if="libros">
            <tr v-for="libro in libros" :key="libro.id">
              <td>{{ libro.id }}</td>
              <td>{{ libro.ISBN }}</td>
              <td>{{ libro.nombreLibro }}</td>
              <td>{{ libro.anopublicacion }}</td>
              <td>{{ libro.edicionLibro }}</td>
              <td>{{ libro.clasificacionLibro }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminar(libro.id)">
                  Eliminar
                </button>
                <button
                  class="btn btn-info"
                  @click="iniciarActualizacion(libro.id)"
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
import { ILibro } from "../Interface/ILibro";
import { Router } from "vue-router";

@Options({
  props: {
    libros: Array,
  },
})
export default class Libros extends Vue {
  mostrandoFormulario = false;
  actualizando = false;
  libroActual: ILibro | null = null;
  $router!: Router;
  redireccionar(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption) {
      this.$router.push(selectedOption);
    }
  }
  libros: Array<ILibro> = [];

  mounted() {
    this.fetchData();
  }

  //Mostrar datos de la Base de datos
  fetchData() {
    fetch("http://localhost:3000/api/libros")
      .then((response) => response.json())
      .then((data: ILibro[] | undefined) => {
        // Verificar si data es undefined antes de intentar ordenar
        if (data) {
          // Ordenar los libros por ID
          this.libros = data.sort((a, b) => {
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
  async agregarLibro() {
    try {
      const ISBNInput = this.$refs.ISBN as HTMLInputElement;
      const nombreLibroInput = this.$refs.nombreLibro as HTMLInputElement;
      const anopublicacionInput = this.$refs.anopublicacion as HTMLInputElement;
      const edicionLibroInput = this.$refs.edicionLibro as HTMLInputElement;
      const clasificacionLibroInput = this.$refs
        .clasificacionLibro as HTMLInputElement;

      if (
        !ISBNInput ||
        !nombreLibroInput ||
        !anopublicacionInput ||
        !edicionLibroInput ||
        !clasificacionLibroInput
      ) {
        console.error(
          "Al menos uno de los campos del formulario no está presente."
        );
        return;
      }

      const ISBN = Number(ISBNInput.value);
      const nombreLibro = nombreLibroInput.value;
      const anopublicacion = Number(anopublicacionInput.value);
      const edicionLibro = edicionLibroInput.value;
      const clasificacionLibro = clasificacionLibroInput.value;
      const ISBNVerificado = await this.verificarISBN(ISBN);

      if (ISBNVerificado) {
        // Si el ISBN está verificado, procede a agregar el libro
        const response = await fetch("http://localhost:3000/api/libros", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ISBN,
            nombreLibro,
            anopublicacion: Number(anopublicacion),
            edicionLibro,
            clasificacionLibro,
          }),
        });

        const data = await response.json();
        console.log(data);

        // Terminar la operación y recargar la página
        this.mostrandoFormulario = false;
        location.reload();
      } else {
        // Si el ISBN no está verificado, muestra una alerta
        console.log("El ISBN ya está registrado");
      }
    } catch (error) {
      console.error("Error al agregar el libro:", error);
    }
  }

  verificarISBN(isbn: number) {
    const isbnsRegistrados = this.libros.map((libro) => libro.ISBN);
    const isbnExiste = isbnsRegistrados.includes(isbn);

    if (isbnExiste) {
      // El isbn ya está registrado
      alert("El isbn ya está registrado.");
    } else {
      // El isbn no está registrado
      alert("Registro Exitoso.");
    }

    // Devuelve true si el isbn no existe y se puede proceder, false si ya existe.
    return !isbnExiste;
  }

  //Eliminar
  async eliminar(id: number | undefined) {
    try {
      await fetch(`http://localhost:3000/api/libros/${id}`, {
        method: "DELETE",
      });
      // Actualizar la lista de libros después de eliminar
      this.fetchData();
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  }
  iniciarActualizacion(id: number | undefined) {
    if (id !== undefined) {
      this.actualizando = true;
      // Obtener datos del libro para prellenar el formulario
      this.obtenerLibro(id);
    }
  }

  async obtenerLibro(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/api/libros/${id}`);
      const data = await response.json();
      if (typeof data.ISBN === "string" && !isNaN(Number(data.ISBN))) {
        data.ISBN = Number(data.ISBN);
      }
      this.libroActual = data;
    } catch (error) {
      console.error("Error al obtener datos del Libro:", error);
    }
  }

  async guardarActualizacion() {
    if (this.libroActual) {
      const {
        id,
        ISBN,
        nombreLibro,
        anopublicacion,
        edicionLibro,
        clasificacionLibro,
      } = this.libroActual;
      try {
        const response = await fetch(`http://localhost:3000/api/libros/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ISBN: Number(ISBN),
            nombreLibro,
            anopublicacion: Number(anopublicacion),
            edicionLibro,
            clasificacionLibro,
          }),
        });
        const data = await response.json();
        console.log(data);
        // Terminar la actualización y recargar la página
        this.actualizando = false;
        location.reload();
      } catch (error) {
        console.error("Error al actualizar el libro:", error);
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
