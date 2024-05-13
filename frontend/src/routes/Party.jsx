import partyFetch from "../axios/config"
import useToast from "../hooks/useToast"

import { useState, useEffect } from "react"
import { useParams, Link , useNavigate} from "react-router-dom"

import "./Party.css";

const Party = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [party, setParty] = useState(null);

    useEffect(() => {
        const loadParty = async () => {
            const response = await partyFetch.get(`/parties/${id}`);

            setParty(response.data);
        }

        loadParty();
    }, [])

    const handleDelete = async () => {
        const response = await partyFetch.delete(`/parties/${id}`)

        if (response.status === 200) {
            navigate("/");

            useToast(response.data.message);
        }
    }

    if (!party) return <p>Carregando...</p>

  return (
    <div className="party">
        <h1>{party.title}</h1>
        <div className="actions-container">
            <Link className="btn" to={`/party/edit/${party._id}`}>Editar</Link>
            <button className="btn-secondary" onClick={handleDelete}>Excluir</button>
        </div>
        <p>Orçamento: R${party.budget}</p>
        <h3>Serviços contratados:</h3>
        <div className="services-container">
            {party.services.map((service) => (
                <div className="service" key={service._id}>
                    <img src={service.image} alt={service.name} />
                    <p>{service.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Party