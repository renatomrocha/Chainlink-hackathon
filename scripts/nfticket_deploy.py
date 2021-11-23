from brownie import NFTickets, accounts, network, config
from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS
from web3 import Web3



def deploy_nfticket_factory(updateInterval):
    account = get_account()

    nfticket_factory = NFTickets.deploy(updateInterval, {"from": account}, publish_source=config["networks"][network.show_active()]["verify"])
    print(f"Contract deployed to {nfticket_factory.address}")
    return nfticket_factory


def main():
    nfticket_factory = deploy_nfticket_factory()