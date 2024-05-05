FROM condaforge/mambaforge:23.3.1-0

# Set the working directory in the container
WORKDIR /app

RUN apt-get update
RUN apt-get install build-essential -y

COPY ./requirements.txt /app/requirements.txt
COPY ./setup-env.sh /app/setup-env.sh

# Run the build script
RUN ./setup-env.sh picssmart

RUN pip cache purge

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "server.__main__:create_app", "--factory", "--reload"]
