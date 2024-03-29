import pytest

@pytest.fixture(autouse=True)
def setup(fn_isolation):
    """
    Isolation setup fixture.
    This ensures that each test runs against the same base environment.
    """
    pass


@pytest.fixture(scope="module")
def vyper_storage(accounts, VyperStorage):
    """
    Yield a `Contract` object for the VyperStorage contract.
    """
    yield accounts[0].deploy(VyperStorage)


@pytest.fixture(scope="module")
def solidity_storage(accounts, SolidityStorage):
    """
    Yield a `Contract` object for the SolidityStorage contract.
    """
    yield accounts[0].deploy(SolidityStorage)


@pytest.fixture(scope="module")
def ticket_factory(accounts, TicketFactory):
    """
    Yield a `Contract` object for the TicketFactory contract.
    """
    yield accounts[0].deploy(TicketFactory)


@pytest.fixture(scope="module")
def nfticket_factory():
    """
    Yield a `Contract` object for the TicketFactory contract.
    """
    return deploy_nfticket_factory()
