import brownie


def test_ticket_factory_deploy(ticket_factory):
    """
    Test if the contract is correctly deployed.
    """
    print(ticket_factory.address)
    assert ticket_factory.address != 0x0


def test_ticket_factory_mint(accounts, ticket_factory):
    """
    Users can mint tickets to their events
    """
    bob = accounts[1]
    ticket_factory.createEventTickets(100, 1, "Classical Concert", {"from": bob})
    owner_balance = ticket_factory.balanceOf(bob, 0)

    assert owner_balance == 100


def test_ticket_factory_buy(accounts, ticket_factory):
    """
    Users can buy tickets from the event owners
    """
    bob = accounts[1]
    alice = accounts[2]
    ticket_factory.createEventTickets(100, 1, "Classical Concert", {"from": bob})

    ticket_factory.buyFromOwner(0, 40, {"from": alice, "value": 40})

    alice_balance = ticket_factory.balanceOf(alice, 0)
    bob_balance = ticket_factory.balanceOf(bob, 0)

    assert alice_balance == 40
    assert bob_balance == 60


def test_buy_insufficient_funds(accounts, ticket_factory):
    """
    Users cannot buy tickets without providing proper funds
    """
    bob = accounts[1]
    alice = accounts[2]
    ticket_factory.createEventTickets(100, 1, "Classical Concert", {"from": bob})

    with brownie.reverts("Not enough funds sent to buy the tickets"):
        ticket_factory.buyFromOwner(0, 40, {"from": alice, "value": 39})


def test_buy_insufficient_tickets(accounts, ticket_factory):
    """
    Users cannot buy tickets that are not available
    """
    bob = accounts[1]
    alice = accounts[2]
    jack = accounts[3]
    ticket_factory.createEventTickets(100, 1, "Classical Concert", {"from": bob})

    ticket_factory.buyFromOwner(0, 60, {"from": alice, "value": 60})

    with brownie.reverts("The owner does not have enough tickets to sell"):
        ticket_factory.buyFromOwner(0, 41, {"from": jack, "value": 41})
