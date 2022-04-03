## Pipeline
### Create lobby
* Lobby uuid
* Buy in
* Rake
* Gametime
### User find lobbies
### User Join Lobby
* Seen as a commiting to buyin
* Lock ETH
* Lobby ID
### User Buy-in
* Sent to SC
	* Buyin
	* Lobby ID
### Game start once 5 people confirm
### Accept Queue
* Confirming to payout ethereum
## Specs
### Create Lobby
* Goal: Server creates lobby with given parameters to allowed players to join a potential game
* Buy in amount (fixed)
* UUID (hexstring) (note: uuid don't exist for sol so https://ethereum.stackexchange.com/questions/9965/how-to-generate-a-unique-identifier-in-solidity)
* Rake (set as fixed)
* Game Time (int)
* Players needed (fixed number)
* status started/not (boolean)
* **Can only be called by a specific admin (server in this case)**
### Join Lobby
* Goal: Client joins a lobby and is seen as a commiting of payment to the SC
* Player is added to lobby 
* Seen as committing funds to lobby SC
* lock ETH (boolean?)
* Lobby UUID (uint)
* user address (address payable)
#### Leaving Lobby
* Goal: Method to deal with clients who leave the lobby in some manner and how we refund them and the other players and pay for lost gas
* Refund initiated for player leaving but we take a cut to pay for gas (take 5%?)
### Accept Queue
* Goal: Once lobby is full, a queue pop will be initiated to start game a lock funds into SC
* **Add ETH to lobby contract**
	* Lock funds as game starts based on lobby buy-in
* Lobby UUID
### Game End
* Goal: Take funds taken from players - rake and send it to winning player
### Game Cancel
* Goal: backdoor in case something happens with game
* **Only Admin can call**
* processes refund
### Consider when refunds should be allowed