import asyncio
import pandas as pd
from server.db import media

async def prepate_csv():
    media_results = await media.get_media({}, {"path": 1, "caption": 1}, "name", 0)
    captions_data = []
    for result in media_results:
        captions_data.append({'file_name': result["path"], 'text': result["caption"]})
    captions_df = pd.DataFrame(captions_data)
    captions_df.to_csv('data/metadata.csv', index=False)
    print("metadata.csv file created successfully.")

asyncio.run(prepate_csv())