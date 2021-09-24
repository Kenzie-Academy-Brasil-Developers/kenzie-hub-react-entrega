import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Button, Select, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./style.css";

export const SignupForm = () => {
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().required("Email é obrigatório").email("Email Inválido"),
    bio: yup.string().required("Informe uma bio"),
    contact: yup
      .string()
      .required("Informe uma forma de contato ex.: LinkedIn, telefone, etc..."),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .matches(/[A-Za-z0-9]{6,}/, "Senha deve conter ao menos 6 caracteres"),
    course_module: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmitFunction)}>
      <Box
        component="div"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Bio"
          variant="outlined"
          {...register("bio")}
          error={!!errors.bio}
          helperText={errors.bio?.message}
        />
        <Select
          id="simple-select-required"
          label="Módulo *"
          value="Primeiro módulo (Introdução ao Frontend)"
          displayEmpty
          {...register("course_module")}
        >
          <MenuItem value="Primeiro módulo (Introdução ao Frontend)">
            Módulo 1
          </MenuItem>
          <MenuItem value="Segundo módulo (Frontend Avançado)">
            Módulo 2
          </MenuItem>
          <MenuItem value="Terceiro módulo (Introdução ao Backend)">
            Módulo 3
          </MenuItem>
          <MenuItem value="Quarto módulo (Backend Avançado)">Módulo 4</MenuItem>
        </Select>
        <Button variant="contained" type="submit">
          ENVIAR
        </Button>
      </Box>
    </form>
  );
};
