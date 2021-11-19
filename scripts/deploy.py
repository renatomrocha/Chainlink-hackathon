from brownie import TicketFactory, accounts, network, config
from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS
from web3 import Web3



def deploy_ticket_factory():
    account = get_account()

    ticket_factory = TicketFactory.deploy({"from": account}, publish_source=config["networks"][network.show_active()]["verify"])
    print(f"Contract deployed to {ticket_factory.address}")
    return ticket_factory


def main():
    ticket_factory = deploy_ticket_factory()




    # if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
    #     price_feed_address = config["networks"][network.show_active()]["eth_usd_price_feed"]
    # else:
    #     # Deploying a mock Aggregator for Ganache local networks
    #     print(f"The active network is {network.show_active()}")
    #     deploy_mocks()
    #     price_feed_address = MockV3Aggregator[-1].address