export type Estado = "Finalizado" | "En progreso" | "Sin comenzar";
export type Interaccion = "Interactuó" | "No interactuó";
export type AreaBI =
  | "Lengua, Literatura y Comunicación"
  | "Lenguas y Culturas Extranjeras"
  | "Individuos, Sociedad y Humanidades"
  | "Ciencias Naturales y Experimentales"
  | "Matemáticas y Pensamiento Lógico"
  | "Artes, Expresión y Creatividad";

export interface Student {
  nombre: string;
  correo: string;
  campus: string;
  mentor: string;
  estado: Estado;
  areas: [AreaBI, AreaBI];
  interaccion: Interaccion;
}

const mentors = [
  "Laura Solís Méndez",
  "Jorge Ibarra Torres",
  "Claudia Fuentes Reyes",
  "Roberto Alvarado Ríos",
  "Patricia Nava Cisneros",
];

const campuses = ["Monterrey", "Guadalajara", "Ciudad de México", "Puebla", "Querétaro", "San Luis Potosí", "Tijuana", "Chihuahua"];

export const students: Student[] = [
  { nombre: "Valentina Torres Mendoza", correo: "A0384751@tec.mx", campus: "Monterrey", mentor: mentors[0], estado: "Finalizado", areas: ["Matemáticas y Pensamiento Lógico", "Ciencias Naturales y Experimentales"], interaccion: "Interactuó" },
  { nombre: "Diego Ramírez Flores", correo: "A0219483@tec.mx", campus: "Guadalajara", mentor: mentors[1], estado: "Finalizado", areas: ["Individuos, Sociedad y Humanidades", "Lengua, Literatura y Comunicación"], interaccion: "Interactuó" },
  { nombre: "Sofía Hernández Reyes", correo: "A0573126@tec.mx", campus: "Ciudad de México", mentor: mentors[2], estado: "En progreso", areas: ["Artes, Expresión y Creatividad", "Lenguas y Culturas Extranjeras"], interaccion: "Interactuó" },
  { nombre: "Andrés Gutiérrez Morales", correo: "A0641897@tec.mx", campus: "Puebla", mentor: mentors[3], estado: "Finalizado", areas: ["Ciencias Naturales y Experimentales", "Matemáticas y Pensamiento Lógico"], interaccion: "No interactuó" },
  { nombre: "Camila López Jiménez", correo: "A0892354@tec.mx", campus: "Querétaro", mentor: mentors[4], estado: "Finalizado", areas: ["Lengua, Literatura y Comunicación", "Artes, Expresión y Creatividad"], interaccion: "Interactuó" },
  { nombre: "Rodrigo Martínez Cruz", correo: "A0715638@tec.mx", campus: "San Luis Potosí", mentor: mentors[0], estado: "Sin comenzar", areas: ["Individuos, Sociedad y Humanidades", "Lenguas y Culturas Extranjeras"], interaccion: "No interactuó" },
  { nombre: "Isabella García Vargas", correo: "A0328947@tec.mx", campus: "Tijuana", mentor: mentors[1], estado: "Finalizado", areas: ["Matemáticas y Pensamiento Lógico", "Individuos, Sociedad y Humanidades"], interaccion: "Interactuó" },
  { nombre: "Emiliano Sánchez Rojas", correo: "A0456721@tec.mx", campus: "Chihuahua", mentor: mentors[2], estado: "En progreso", areas: ["Ciencias Naturales y Experimentales", "Lengua, Literatura y Comunicación"], interaccion: "No interactuó" },
  { nombre: "Mariana Pérez Castillo", correo: "A0183465@tec.mx", campus: "Monterrey", mentor: mentors[3], estado: "Finalizado", areas: ["Lenguas y Culturas Extranjeras", "Artes, Expresión y Creatividad"], interaccion: "Interactuó" },
  { nombre: "Sebastián Gómez Núñez", correo: "A0967234@tec.mx", campus: "Guadalajara", mentor: mentors[4], estado: "Finalizado", areas: ["Matemáticas y Pensamiento Lógico", "Ciencias Naturales y Experimentales"], interaccion: "Interactuó" },
  { nombre: "Lucía Díaz Espinoza", correo: "A0541872@tec.mx", campus: "Ciudad de México", mentor: mentors[0], estado: "En progreso", areas: ["Individuos, Sociedad y Humanidades", "Lengua, Literatura y Comunicación"], interaccion: "Interactuó" },
  { nombre: "Mateo Ávila Montes", correo: "A0629318@tec.mx", campus: "Puebla", mentor: mentors[1], estado: "Finalizado", areas: ["Artes, Expresión y Creatividad", "Lenguas y Culturas Extranjeras"], interaccion: "No interactuó" },
  { nombre: "Natalia Vega Serrano", correo: "A0784156@tec.mx", campus: "Querétaro", mentor: mentors[2], estado: "Finalizado", areas: ["Ciencias Naturales y Experimentales", "Matemáticas y Pensamiento Lógico"], interaccion: "Interactuó" },
  { nombre: "Pablo Ramos Contreras", correo: "A0395827@tec.mx", campus: "San Luis Potosí", mentor: mentors[3], estado: "Sin comenzar", areas: ["Lengua, Literatura y Comunicación", "Individuos, Sociedad y Humanidades"], interaccion: "No interactuó" },
  { nombre: "Valeria Moreno Lara", correo: "A0213649@tec.mx", campus: "Tijuana", mentor: mentors[4], estado: "Finalizado", areas: ["Lenguas y Culturas Extranjeras", "Artes, Expresión y Creatividad"], interaccion: "Interactuó" },
  { nombre: "Fernando Ruiz Medina", correo: "A0857493@tec.mx", campus: "Chihuahua", mentor: mentors[0], estado: "En progreso", areas: ["Matemáticas y Pensamiento Lógico", "Ciencias Naturales y Experimentales"], interaccion: "No interactuó" },
  { nombre: "Regina Domínguez Salinas", correo: "A0472618@tec.mx", campus: "Monterrey", mentor: mentors[1], estado: "Finalizado", areas: ["Individuos, Sociedad y Humanidades", "Lengua, Literatura y Comunicación"], interaccion: "Interactuó" },
  { nombre: "Tomás Ortega Figueroa", correo: "A0138752@tec.mx", campus: "Guadalajara", mentor: mentors[2], estado: "Finalizado", areas: ["Artes, Expresión y Creatividad", "Lenguas y Culturas Extranjeras"], interaccion: "Interactuó" },
  { nombre: "Ana Cristina Fuentes Padilla", correo: "A0926384@tec.mx", campus: "Ciudad de México", mentor: mentors[3], estado: "En progreso", areas: ["Ciencias Naturales y Experimentales", "Individuos, Sociedad y Humanidades"], interaccion: "Interactuó" },
  { nombre: "Miguel Ángel Herrera Téllez", correo: "A0654291@tec.mx", campus: "Puebla", mentor: mentors[4], estado: "Finalizado", areas: ["Lengua, Literatura y Comunicación", "Matemáticas y Pensamiento Lógico"], interaccion: "No interactuó" },
  { nombre: "Daniela Mendoza Ibarra", correo: "A0371845@tec.mx", campus: "Querétaro", mentor: mentors[0], estado: "Finalizado", areas: ["Lenguas y Culturas Extranjeras", "Artes, Expresión y Creatividad"], interaccion: "Interactuó" },
  { nombre: "Jorge Trujillo Aguilar", correo: "A0589123@tec.mx", campus: "San Luis Potosí", mentor: mentors[1], estado: "Sin comenzar", areas: ["Matemáticas y Pensamiento Lógico", "Individuos, Sociedad y Humanidades"], interaccion: "No interactuó" },
  { nombre: "Renata Sandoval Bravo", correo: "A0746582@tec.mx", campus: "Tijuana", mentor: mentors[2], estado: "Finalizado", areas: ["Ciencias Naturales y Experimentales", "Lengua, Literatura y Comunicación"], interaccion: "Interactuó" },
  { nombre: "Alexis Guerrero Orozco", correo: "A0418367@tec.mx", campus: "Chihuahua", mentor: mentors[3], estado: "En progreso", areas: ["Artes, Expresión y Creatividad", "Lenguas y Culturas Extranjeras"], interaccion: "No interactuó" },
  { nombre: "Paola Delgado Carrillo", correo: "A0293714@tec.mx", campus: "Monterrey", mentor: mentors[4], estado: "Finalizado", areas: ["Individuos, Sociedad y Humanidades", "Matemáticas y Pensamiento Lógico"], interaccion: "Interactuó" },
  { nombre: "Héctor Villanueva Ríos", correo: "A0865439@tec.mx", campus: "Guadalajara", mentor: mentors[0], estado: "Sin comenzar", areas: ["Lengua, Literatura y Comunicación", "Ciencias Naturales y Experimentales"], interaccion: "No interactuó" },
  { nombre: "Michelle Acosta Pedraza", correo: "A0512876@tec.mx", campus: "Ciudad de México", mentor: mentors[1], estado: "En progreso", areas: ["Lenguas y Culturas Extranjeras", "Individuos, Sociedad y Humanidades"], interaccion: "Interactuó" },
  { nombre: "Bruno Cervantes Tapia", correo: "A0637148@tec.mx", campus: "Puebla", mentor: mentors[2], estado: "Finalizado", areas: ["Matemáticas y Pensamiento Lógico", "Artes, Expresión y Creatividad"], interaccion: "No interactuó" },
  { nombre: "Fernanda Zúñiga Arévalo", correo: "A0984253@tec.mx", campus: "Querétaro", mentor: mentors[3], estado: "Finalizado", areas: ["Ciencias Naturales y Experimentales", "Lengua, Literatura y Comunicación"], interaccion: "Interactuó" },
  { nombre: "Adrián Montoya Maldonado", correo: "A0175396@tec.mx", campus: "San Luis Potosí", mentor: mentors[4], estado: "Sin comenzar", areas: ["Individuos, Sociedad y Humanidades", "Lenguas y Culturas Extranjeras"], interaccion: "No interactuó" },
];
