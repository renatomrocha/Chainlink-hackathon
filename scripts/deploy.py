from brownie import NFTickets, accounts, network, config
from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS
from web3 import Web3



def deploy_nfticket_factory():
    account = get_account()

    # print("Deploying with price feed: ", config["oracle_price_feeds"]["mumbai_testnet"]["matic_usd"])
    nfticket_factory = NFTickets.deploy(10,config["oracle_price_feeds"]["mumbai_testnet"]["matic_usd"] , {"from": account}, publish_source=config["networks"][network.show_active()]["verify"])
    print(f"Contract deployed to {nfticket_factory.address}")
    return nfticket_factory


def main():
    nfticket_factory = deploy_nfticket_factory()




    # if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
    #     price_feed_address = config["networks"][network.show_active()]["eth_usd_price_feed"]
    # else:
    #     # Deploying a mock Aggregator for Ganache local networks
    #     print(f"The active network is {network.show_active()}")
    #     deploy_mocks()
    #     price_feed_address = MockV3Aggregator[-1].address