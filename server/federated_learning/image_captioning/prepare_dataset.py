import pandas as pd
import logging
from server.db import media

LOG = logging.getLogger(__name__)

async def prepate_csv():
    media_results = await media.get_media({"userReviewed":True}, {"path": 1, "caption": 1}, "name", 0)
    captions_data = []
    for result in media_results:
        captions_data.append({'file_name': result["path"], 
                              'text': result["caption"],
                              'userReviewed': result["userReviewed"]})
    captions_df = pd.DataFrame(captions_data)
    captions_df.to_csv('data/metadata.csv', index=False)
    LOG.debug("metadata.csv file created successfully.")