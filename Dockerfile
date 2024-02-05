FROM condaforge/mambaforge:23.3.1-0

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN mamba create -n picssmart transformers python=3.10 pytorch fairscale dask-mongo torchaudio pytorch-cuda=11.7 iopath cudatoolkit=11.7  -c pytorch -c nvidia -c iopath -c conda-forge -y \
    && conda init bash \
    && source ~/.bashrc \
    && conda activate picssmart \
    && mamba install rapids=23.02 -c rapidsai -c conda-forge -c nvidia -y \
    && pip install "fastapi[all]" pillow pillow-heif einops pycocoevalcap cryptography==38.0.4 motor pymongo pyyaml networkx omegaconf timm decord opencv-python webdataset jupyterlab torchvision tensorflow gdown spacy insightface onnxruntime uvicorn flwr qdrant-client

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "server.__main__:create_app", "--factory", "--reload"]
