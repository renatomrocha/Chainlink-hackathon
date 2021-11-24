import brownie
from scripts.nfticket_deploy import deploy_nfticket_factory


def test_nfticket_factory_deploy():
    """
    Test if the contract is correctly deployed.
    """
    nfticket_factory = deploy_nfticket_factory(5)

    print(nfticket_factory.address)
    assert nfticket_factory.address != 0x0


def test_nfticket_factory_mint(accounts):
    """
    Users can mint tickets to their events
    """
    nfticket_factory = deploy_nfticket_factory(5)
    bob = accounts[1]

    nfticket_factory.createEventTickets(1, 100, 0.1, 1000, "ipfs_uri1", {"from": bob})
    owner_balance = nfticket_factory.balanceOf(bob, 0)

    assert owner_balance == 100


def test_nfticket_factory_buy(accounts):
    """
    Users can buy tickets from the event owners
    """
    nfticket_factory = deploy_nfticket_factory(5)
    bob = accounts[1]
    alice = accounts[2]

    nfticket_factory.createEventTickets(1, 100, 0.1, 1000, "ipfs_uri1", {"from": bob})

    nfticket_factory.buyFromOwner(0, 40, {"from": alice, "value": 40})

    alice_balance = nfticket_factory.balanceOf(alice, 0)
    bob_balance = nfticket_factory.balanceOf(bob, 0)

    assert alice_balance == 40
    assert bob_balance == 60


def test_buy_nfticket_insufficient_funds(accounts):
    """
    Users cannot buy tickets without providing proper funds
    """
    nfticket_factory = deploy_nfticket_factory(5)

    bob = accounts[1]
    alice = accounts[2]

    nfticket_factory.createEventTickets(1, 100, 0.1, 1000, "ipfs_uri1", {"from": bob})

    with brownie.reverts("Not enough funds sent to buy the tickets"):
        nfticket_factory.buyFromOwner(0, 40, {"from": alice, "value": 39})


def test_buy_insufficient_nftickets(accounts):
    """
    Users cannot buy tickets that are not available
    """
    nfticket_factory = deploy_nfticket_factory(5)
    bob = accounts[1]
    alice = accounts[2]
    jack = accounts[3]

    nfticket_factory.createEventTickets(1, 100, 0.1, 1000, "ipfs_uri1", {"from": bob})

    nfticket_factory.buyFromOwner(0, 60, {"from": alice, "value": 60})

    with brownie.reverts("The owner does not have enough tickets to sell"):
        nfticket_factory.buyFromOwner(0, 41, {"from": jack, "value": 41})


def test_batch_creation(accounts):
    """
    Users cannot buy tickets that are not available
    """
    nfticket_factory = deploy_nfticket_factory(5)
    bob = accounts[1]

    nfticket_factory.batchCreateEventTickets(
        [
            [bob, 1, 100, 0.1, 1000, "ipfs_uri1", False],
            [bob, 2, 50, 0.2, 5000, "ipfs_uri2", False],
        ],
        {"from": bob},
    )

    newTicket1 = nfticket_factory.nfTickets(0)
    newTicket2 = nfticket_factory.nfTickets(1)

    assert newTicket1[5] == "ipfs_uri1"
    assert newTicket2[5] == "ipfs_uri2"
