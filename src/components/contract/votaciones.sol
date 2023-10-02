// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Votacion {
    struct Candidato {
        uint256 id;
        string nombre;
        uint256 conteoVotos;
    }

    mapping(address => bool) public votantes;
    mapping(uint256 => Candidato) public candidatos;
    uint256 public conteoCandidatos;

    event eventoVotado(uint256 indexed _idCandidato);

    constructor() {
        agregarCandidato("Bladimir Lopez");
        agregarCandidato("Daniela Galvez");
    }

    function agregarCandidato(string memory _nombre) private {
        conteoCandidatos++;
        candidatos[conteoCandidatos] = Candidato(conteoCandidatos, _nombre, 0);
    }

    function votar(uint256 _idCandidato) public {
        require(!votantes[msg.sender]);
        require(_idCandidato > 0 && _idCandidato <= conteoCandidatos);

        votantes[msg.sender] = true;
        candidatos[_idCandidato].conteoVotos++;

        emit eventoVotado(_idCandidato);
    }
}
