#!/bin/bash
set -o pipefail

install_dependencies() {
    local env_name="$1"

    # Create conda environment
    mamba create -n $env_name transformers python=3.10 pytorch fairscale dask-mongo torchaudio pytorch-cuda=11.7 iopath cudatoolkit=11.7 -c pytorch -c nvidia -c iopath -c conda-forge -y

    eval "$(conda shell.bash hook)"
    conda activate $env_name
    active_env=$(conda info | awk '/active environment/ {print $NF}')

    if [[ $active_env == $env_name ]]; then
        # # Install additional conda packages
        mamba install rapids=23.02 -c rapidsai -c conda-forge -c nvidia -y

        # # Install pip packages
        pip install "fastapi[all]" pillow pillow-heif einops pycocoevalcap cryptography==38.0.4 motor pymongo pyyaml networkx omegaconf timm decord opencv-python webdataset jupyterlab torchvision tensorflow gdown spacy insightface onnxruntime uvicorn flwr salesforce-lavis qdrant-client apscheduler
        echo "Dependencies installed successfully in the $env_name conda environment"
    fi
}

enabling_services() {
    export userid=$(id -u)
    export GID=$(id -g)
    docker compose up -d
    echo "Docker services are up and running"
}

# Check if environment name is provided as command line argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <environment_name>"
    exit 1
fi

# Call the function with provided environment name
install_dependencies "$1"

enabling_services
