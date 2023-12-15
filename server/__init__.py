
"""
Server side code for AI-ALBUM
"""

__title__ = 'PicsSmart'
__version__ = VERSION = '0.0.1'
__author__ = 'Akila-I | BanulaKumarage | HirunaHarankahadeniya'
__license__ = 'TBD'
__copyright__ = 'TBD'


import logging
import warnings
from logging.config import dictConfig
from pathlib import Path
import yaml
import pathlib
import os
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

from pillow_heif import register_heif_opener


logging.captureWarnings(True)

warnings.simplefilter("default")


# TODO attach this bit to indexer
SUPPORTED_IMAGE_FORMATS = ['jpeg', 'jpg', 'NEF', 'GPR']
CWD = pathlib.Path(os.getcwd())


def load_logger():
    log_file = Path(__file__).parent / "logger.yml"

    with open(log_file, 'r') as stream:
        dictConfig(yaml.safe_load(stream))

thread_pool_executor = ThreadPoolExecutor(max_workers=8)
process_pool_executor = ProcessPoolExecutor(max_workers=8)

load_logger()
register_heif_opener()
load_dotenv(os.path.join(os.path.abspath(os.path.dirname(__file__)), '.env'))
