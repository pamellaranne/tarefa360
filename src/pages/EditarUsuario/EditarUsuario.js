import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../componentes/Sidebar/Sidebar';
import { Topbar } from '../../componentes/Topbar/Topbar';
import style from './EditarUsuario.module.css';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import UsuarioAPI from '../../services/usuarioAPI';
import Button from 'react-bootstrap/Button';

export function EditarUsuario() {
    const location = useLocation();
    const navigate = useNavigate();
    const [id] = useState(location.state);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState();
    const [tiposUsuarios, setTiposUsuarios] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid()) {
            try {
                await UsuarioAPI.atualizarAsync(id, nome, email, tipoUsuario);
                navigate('/usuarios')
            } catch (error) {
                console.error("Erro ao atualizar o usuário:", error);
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    useEffect(() => {
        //async function buscarTiposUsuarios(){}
        const buscarTiposUsuarios = async () => {
            try {
                const tipos = await UsuarioAPI.listarTiposUsuarioAsync();
                setTiposUsuarios(tipos);
            } catch (error) {
                console.error("Erro ao buscar tipos de usuários:", error);
            }
        };

        const buscarDadosUsuario = async () => {
            try {
                const usuario = await UsuarioAPI.obterAsync(id);

                setNome(usuario.nome)
                setEmail(usuario.email)
                setTipoUsuario(usuario.tiposUsuarioId);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        }
        buscarDadosUsuario();
        buscarTiposUsuarios();

    }, []);

    const isFormValid = () => {
        return nome && email && tipoUsuario;
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Usuário</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                name="nome"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTipoUsuario" className="mb-3">
                            <Form.Label>Tipo de Usuário</Form.Label>
                            <Form.Control
                                as="select"
                                name="tipoUsuario"
                                value={tipoUsuario}
                                onChange={(event) => setTipoUsuario(event.target.value)}
                                required
                            >
                                {tiposUsuarios.map((tipo) => (
                                        <option value={tipo.id}>{tipo.nome}</option>
                                
                                ))}

                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>
                    </Form>
                </div>
            </Topbar>
        </Sidebar>
    )
}