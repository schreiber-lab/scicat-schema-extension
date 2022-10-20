FROM continuumio/miniconda:latest

COPY environment.yml ./

RUN conda env create -f environment.yml

# copy api later so that env only needs to be rebuilt if there are really changes in env file
COPY upload_backend ./upload_backend

COPY run.sh ./

RUN chmod +x run.sh

ENV PYTHONUNBUFFERED=1
RUN echo "source activate addon_api_env" > ~/.bashrc
ENV PATH /opt/conda/envs/addon_api_env/bin:$PATH

EXPOSE 5000

ENTRYPOINT ["./run.sh"]
