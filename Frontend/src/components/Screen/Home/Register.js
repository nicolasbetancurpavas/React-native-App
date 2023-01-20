import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Ionicons } from "@expo/vector-icons"
import Logo from '../Shared/Logo'
import axios from 'axios'

const principalColor = '#6A10C3'
const subColor = '#2884E0'

export default function Register({ navigation }) {

    const [confirmRegister, setConfirmRegister] = useState('')
    const [iconConfirm, setIconConfirm] = useState('')

    const [isLoading, setLoading] = useState(true);

    const [result, setResult] = useState('none');

    const saveCliente = async (identificacion, nombre, apellido, correo, contra) => {

        try {
            const response = await axios.post(`http://localhost:3000/registrar`, {
                "identificacion": identificacion,
                "nombre": nombre,
                "apellido": apellido,
                "correo": correo,
                "password": contra,
            });

            setConfirmRegister('Exito en el Registro')
            setIconConfirm('checkbox')
            setTimeout(() => {
                setConfirmRegister('')
                setIconConfirm('')
            }, 2000)

        } catch (error) {
            console.log(error)
            setConfirmRegister('Ha habido un error vuelve intentar')
        }

        finally {
            setLoading(false);
        }
    };

    const { control, handleSubmit, reset, formState: { errors } } = useForm({

        defaultValues: {
            identificacion: '',
            nombre: '',
            apellido: '',
            correo: '',
            contra: '',
        }
    })

    const onSubmit = data => {
        saveCliente(
            data.identificacion,
            data.nombre,
            data.apellido,
            data.correo,
            data.contra,
        )
        reset()
        console.log('hola')
    }

    return (
        <View style={styles.container}>

            <Text style={styles.containerConfirm}>{confirmRegister}
                <Ionicons name={iconConfirm} style={styles.iconConfirm}> </Ionicons>
            </Text>

            <Logo
                primaryText={'Seller'}
                secondaryText={'Register'}
            />
            <View>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[0-9]*(\.?)[ 0-9]+$/,
                        minLength: 4
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputs}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={'Digitar id'}
                        />
                    )}

                    name="identificacion"
                />

                {errors.identificacion?.type == 'required' && <Text style={styles.textError}>se requiere este dato</Text>}
                {errors.identificacion?.type == 'pattern' && <Text style={styles.textError}>solo Numeros</Text>}
                {errors.identificacion?.type == 'minLength' && <Text style={styles.textError}>debe tener mas de 5 letras </Text>}

                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[A-Z]+$/i,
                        minLength: 3
                    }}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputs}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={'Digita Nombre'}
                        />
                    )}

                    name="nombre"
                />

                {errors.nombre?.type == 'required' && <Text style={styles.textError}>se requiere este dato</Text>}
                {errors.nombre?.type == 'pattern' && <Text style={styles.textError}>solo letras</Text>}
                {errors.nombre?.type == 'minLength' && <Text style={styles.textError}>debe tener mas de 4 letras</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[A-Z]+$/i,
                        minLength: 4
                    }}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputs}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={'Digita Apellido'}
                        />
                    )}

                    name="apellido"
                />

                {errors.apellido?.type == 'required' && <Text style={styles.textError}>se requiere este dato</Text>}
                {errors.apellido?.type == 'pattern' && <Text style={styles.textError}>solo letras</Text>}
                {errors.apellido?.type == 'minLength' && <Text style={styles.textError}>debe tener mas de 4 letras</Text>}

                <Controller

                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                    }}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputs}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={'Digitar correo'}
                        />
                    )}
                    name="correo"
                />

                {errors.correo?.type == 'required' && <Text style={styles.textError} > se requiere este dato</Text>}
                {errors.correo?.type == 'pattern' && <Text style={styles.textError}> Digitar correo valido</Text>}


                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputs}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={'Digitar contraseña'}
                        />
                    )}
                    name="contra"
                />

                {errors.contra?.type == 'required' && <Text style={styles.textError} > se requiere este dato,</Text>}
                {errors.contra?.type == 'pattern' && <View>
                    <Text style={styles.textError}>al menos 1 MAYUSCULAS</Text>
                    <Text style={styles.textError}>al menos 1 caracter especial</Text>
                    <Text style={styles.textError}>numeros</Text>
                </View>}

            </View>

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.btn}>Registrar</Text>
            </TouchableOpacity>

            <Text
                style={styles.textLogin}
                onPress={() => navigation.navigate('Login')}
            > ───── Iniciar sesion  ───── </Text>

            <View style={styles.containerImg}
            >
                <Image
                    style={styles.imgHome}
                    source={require('../../../assets/img/insta.png')}
                />
                <Image
                    style={styles.imgHome}
                    source={require('../../../assets/img/google.png')}
                />
                <Image
                    style={styles.imgHome}
                    source={require('../../../assets/img/facebook.png')}
                />
            </View>

        </View >
    )
}

const styles = StyleSheet.create(

    {

        container: {
            marginTop: 0,
            maxWidth: 450,
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: 'red',
            margin: 'auto',
            padding: 0,
            backgroundColor: 'white',
        },

        inputs: {
            width: 250,
            textAlign: 'center',
            backgroundColor: `white`,
            padding: 15,
            marginBottom: 16,
            color: `#A4A4A4`,
            shadowColor: "#666666",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
            borderRadius: 8,
            fontFamily: 'monospace'
        },

        btn: {
            width: 290,
            backgroundColor: `${subColor}`,
            color: '#E3E3E3',
            padding: 10,
            textAlign: 'center',
            marginTop: 30,
            borderRadius: 8,
            shadowColor: "#666666",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
            borderRadius: 8,
            fontFamily: 'monospace'
        },

        containerImg: {
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: 80,
        },

        imgHome: {
            width: 35,
            height: 35,
            marginRight: 15
        },

        textLogin: {
            marginTop: 15,
            color: `${subColor}`,
            fontFamily: 'monospace',

        },

        textError: {
            fontSize: 13,
            color: 'red',
            textAlign: 'center',
            marginBottom: 5,
            fontFamily: 'monospace',
        },

        containerConfirm: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 22,
            color: '#6A6A6A',
        },

        iconConfirm: {
            color: '#60D856',
            fontSize: 45,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 5,
            marginLeft: 10,
        }

    })
