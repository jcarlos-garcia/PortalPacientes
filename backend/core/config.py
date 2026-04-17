from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    azure_tenant_id: str
    azure_client_id: str
    azure_api_audience: str

    # Azure OpenAI
    azure_openai_endpoint: str
    azure_openai_key: str
    azure_openai_deployment: str = "gpt-4.1-mini"

    class Config:
        env_file = ".env"

settings = Settings()