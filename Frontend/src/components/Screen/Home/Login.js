import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Ionicons } from "@expo/vector-icons"
import Logo from '../Shared/Logo'
import axios from 'axios'

export default function Login({ navigation }) {


    const [confirmRegister, setConfirmRegister] = useState('')
    const [iconConfirm, setIconConfirm] = useState('')

    const [dataBd, setDataBd] = useState([]);


    const [isLoading, setLoading] = useState(true);


    const getClientes = async () => {

        const url = 'http://localhost:3000/vendedores'

        try {
            const response = await axios.get(url)
            setDataBd(response.data.datos)
        }

        catch (error) {
            console.log(error)
        }

        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getClientes();
    }, []);

    console.log(dataBd[0])


    const { control, handleSubmit, reset, formState: { errors } } = useForm({

        defaultValues: {
            correo: '',
            contra: '',
        }

    })

    const onSubmit = data => {
        reset()
    }


    return (
        <View style={styles.body}>

            <View style={styles.container}>

                <Text style={styles.containerConfirm}>{confirmRegister}
                    <Ionicons name={iconConfirm} style={styles.iconConfirm}> </Ionicons>
                </Text>

                <Logo
                    primaryText={'Seller'}
                    secondaryText={'Login'}
                />

                <View>
                    <Ionicons
                        name='mail' style={styles.icons}> </Ionicons>
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

                    <Ionicons name='lock-closed-sharp' style={styles.icons}> </Ionicons>
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

                    {errors.contra?.type == 'required' && <Text style={styles.textError} > se requiere este dato</Text>}
                    {errors.contra?.type == 'pattern' && <Text style={styles.textError} > te coji</Text>}

                    <Text style={styles.textPassword}
                        onPress={() => Alert.alert('hola mundo')}
                    >
                        olvidaste tu contraseña ?
                    </Text>

                </View>

                <View>

                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.btn}>Iniciar sesion</Text>

                    </TouchableOpacity>

                    <Text
                        style={styles.textLogin}

                    > ───── No tienes cuenta? ───── </Text>

                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.btnRegister}>Registrar</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.containerImg}>
                    <Image
                        style={styles.imgHome}
                        source={require('../../../assets/img/appstore.png')}
                    />
                    <Image
                        style={styles.imgHome}
                        source={require('../../../assets/img/googleApp.png')}
                    />
                </View>

            </View >
        </View>
    )
}

const principalColor = '#6A10C3'
const subColor = '#2884E0'

const styles = StyleSheet.create(

    {

        body: {
            backgroundColor: '#070707'
        },

        container: {
            marginTop: 0,
            maxWidth: 450,
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: 'auto',
            padding: 0,
            backgroundColor: '#070707',
        },

        inputs: {
            width: 250,
            textAlign: 'center',
            backgroundColor: `white`,
            padding: 15,
            marginBottom: 12,
            color: `#8C8B8B`,
            shadowColor: `#383838`,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.45,
            shadowRadius: 10.68,

            elevation: 10,
            borderRadius: 5,
            fontFamily: 'monospace',
            backgroundColor: '#070707'
        },

        btn: {
            width: 290,
            backgroundColor: `${subColor}`,
            color: '#E3E3E3',
            padding: 10,
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 10,
            borderRadius: 8,
            shadowColor: `${subColor}`,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.88,
            shadowRadius: 20.68,
            elevation: 11,
            borderRadius: 8,
            elevation: 11,
            borderRadius: 8,
            fontFamily: 'monospace'
        },

        btnRegister: {
            width: 290,
            backgroundColor: `${principalColor}`,
            color: '#E3E3E3',
            padding: 10,
            textAlign: 'center',
            marginTop: 0,
            borderRadius: 8,
            shadowColor: `${principalColor}`,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.88,
            shadowRadius: 20.68,

            elevation: 11,
            borderRadius: 8,
            fontFamily: 'monospace'
        },

        containerImg: {
            flexDirection: 'colum',
            marginTop: 30,
            marginBottom: 80,
        },

        textPassword: {
            position: 'absolute',
            right: -15,
            bottom: -10,
            color: '#8C8B8B',
        },

        imgHome: {
            width: 180,
            height: 45,
            marginBottom: 10,
            borderRadius: 10,
        },

        textLogin: {
            marginTop: 15,
            textAlign: 'center',
            color: '#8C8B8B',
            fontFamily: 'monospace',
            marginBottom: 10,
        },

        textError: {
            fontSize: 13,
            color: 'red',
            textAlign: 'center',
            marginBottom: 5,
            fontFamily: 'monospace',
        },

        touchable: {
            margin: 0
        },

        icons: {
            color: '#7A7A7A',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 5
        },

        containerConfirm: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 30,
            color: `${subColor}`,
            padding: 10,
            opacity: 0.49
        },

        iconConfirm: {
            color: `${subColor}`,
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft: 10,
        }

    })
