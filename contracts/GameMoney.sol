// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract GameMoney {
    enum GameStates {
        WAITING,
        STARTED,
        DONE,
        CANCELLED
    }

    struct Lobby {
        address lobby_id;
        uint256 buy_in;
        uint256 rake;
        uint8 num_players;
        uint256 start_date;
        uint256 game_time;
        uint8 num_accepted;
        uint8 num_curr_players;
        address[] players;
        GameStates status;
    }

    mapping(address => Lobby) lobbies;
    mapping(address => uint256) player_deposits;
    mapping(address => uint256) player_locked_funds;
    uint256 num_lobbies;
    address admin;

    constructor() public {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function createLobby(
        address lobby_id,
        uint256 buy_in,
        uint256 rake,
        uint8 num_players,
        uint256 start_date,
        uint256 game_time
    ) public onlyAdmin {
        Lobby storage l = lobbies[lobby_id];
        l.lobby_id = lobby_id;
        l.buy_in = buy_in;
        l.rake = rake;
        l.num_players = num_players;
        l.num_accepted = 0;
        l.start_date = start_date;
        l.game_time = game_time;
        l.status = GameStates.WAITING;
        l.num_curr_players = 0;
        l.players = new address[](num_players);
        num_lobbies++;
    }

    function getBuyInByID(address lobby_id) public view returns (uint256) {
        return lobbies[lobby_id].buy_in;
    }

    function deposit() public payable {
        player_deposits[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return player_deposits[msg.sender];
    }

    function withdraw() public {
        uint256 player_deposit = player_deposits[msg.sender];
        address(msg.sender).transfer(player_deposit);
        player_deposits[msg.sender] -= player_deposit;
    }

    function joinLobby(address lobby_id) public {
        require(player_deposits[msg.sender] > lobbies[lobby_id].buy_in);
        require(
            lobbies[lobby_id].num_players > lobbies[lobby_id].num_curr_players
        );

        player_deposits[msg.sender] -= lobbies[lobby_id].buy_in;
        player_locked_funds[msg.sender] += lobbies[lobby_id].buy_in;

        uint8 x = lobbies[lobby_id].num_curr_players++;
        lobbies[lobby_id].players[x - 1] = msg.sender;
    }

    function acceptGame(address lobby_id) public {
        Lobby memory lobby = lobbies[lobby_id];
        require(lobby.num_curr_players == lobby.num_players);

        player_locked_funds[msg.sender] -= lobby.buy_in;
        lobby.num_accepted++;
    }

    function endGame(address lobby_id, address payable winner)
        public
        onlyAdmin
    {
        winner.transfer(
            lobbies[lobby_id].buy_in * lobbies[lobby_id].num_accepted
        );
        lobbies[lobby_id].status = GameStates.DONE;
    }
}
