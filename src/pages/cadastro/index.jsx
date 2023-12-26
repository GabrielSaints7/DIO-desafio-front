import React from 'react'
import { Header } from '../../components/Header'
import { Column, Container, DetailsLogin, Row, SubtitleLogin, Title, TitleLogin, Wrapper, CriarText } from '../cadastro/styles'
import { api } from '../../services/api';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdUser } from 'react-icons/md'
import { FaUser } from "react-icons/fa";


export const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);

            if (data.length && data[0].id) {
                navigate('/feed')
                return
            }

            alert('Usuário ou senha inválido')
        } catch (e) {
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);
    return (<>
        <Header />
        <Container>
            <Column>
                <Title>
                    A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
                </Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Comece agora grátis</TitleLogin>
                    <SubtitleLogin>Crie sua conta e make the change_</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Input placeholder="Nome completo" leftIcon={<FaUser />} name="nome" control={control} />
                        {errors.name && <span>Nome Completo é obrigatório</span>}
                        <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}
                        <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                        {errors.senha && <span>Senha é obrigatório</span>}
                        <Button title="Entrar" variant="secondary" type="submit" />
                    </form>
                    <DetailsLogin>
                        Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
                    </DetailsLogin>
                    <Row>
                        <DetailsLogin>Já tenho conta</DetailsLogin>
                        <CriarText>Fazer login</CriarText>
                    </Row>
                </Wrapper>

            </Column>
        </Container>
    </>
    )
}

