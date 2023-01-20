const saveCliente = async (identificacion, nombre, apellido, correo, contra) => {

    try {
        const response = await axios.post(`http://localhost:3000/registrar`, {
            "identificacion": identificacion,
            "nombre": nombre,
            "apellido": apellido,
            "correo": correo,
            "password": contra,
        });

        alert("Cliente agregado correctamente ...")

    } catch (error) {
        console.log(error)
    }

    finally {
        setLoading(false);
    }
};