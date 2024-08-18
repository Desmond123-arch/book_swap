import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import mimetypes

SCOPES = ["https://www.googleapis.com/auth/drive"]

details ={
    "type": os.getenv('TYPE'),
    "project_id": os.getenv('PROJECT_ID'),
    "private_key_id": os.getenv('PRIVATE_KEY_ID'),
    "private_key": os.getenv('PRIVATE_KEY').replace('\\n', '\n'),
    "client_email": os.getenv('CLIENT_EMAIL'),
    "client_id": os.getenv('CLIENT_ID'),
    "auth_uri":  os.getenv('AUTH_URI'),
    "token_uri": os.getenv('TOKEN_URI'),
    "auth_provider_x509_cert_url":os.getenv('AUTH_PROVIDER_X509_CERT_URL'),
    "client_x509_cert_url": os.getenv('CLIENT_X509_CERT_URL'),
    "universe_domain": os.getenv('UNIVERSE_DOMAIN')
  }
  


credentials  = service_account.Credentials.from_service_account_info(details, scopes=SCOPES)

drive_service = build('drive', 'v3', credentials = credentials)


def create_folder(folder_name, parent_folder_id=None):
    """ Create a google drive folder """
    folder_metadata = {
        'name': folder_name,
        'mimeType': "application/vnd.google-apps.folder",
        'parents': [parent_folder_id] if parent_folder_id else []
    }
    created_folder = drive_service.files().create(
        body = folder_metadata,
        fields='id'
    ).execute()
    print(created_folder)
    return created_folder

def list_folder(parent_folder_id=None, delete=False):
    """List folders and files in Google Drive."""
    results = drive_service.files().list(
        q=f"'{parent_folder_id}' in parents and trashed=false" if parent_folder_id else None,
        pageSize=1000,
        fields="nextPageToken, files(id, name, mimeType)"
    ).execute()
    items = results.get('files', [])

    if not items:
        print("No folders or files found in Google Drive.")
    else:
        print("Folders and files in Google Drive:")
        for item in items:
            print(item)
            if delete:
                delete_files(item['id'])

def delete_files(file_or_folder_id):
    """Delete a file or folder in Google Drive by ID."""
    try:
        drive_service.files().delete(fileId=file_or_folder_id).execute()
        print(f"Successfully deleted file/folder with ID: {file_or_folder_id}")
    except Exception as e:
        print(f"Error deleting file/folder with ID: {file_or_folder_id}")
        print(f"Error details: {str(e)}")


def upload_file(file_path, file_name, parent_folder_id=None):
    """ Upload a file to the google drive """
    mime_type, _ = mimetypes.guess_type(file_path)
    file_metadata ={
        'name': file_name,
        'parents':['1JfguZenCdvhuAwLR7AD7jwYv61SmuEbH']
    }
    media = MediaFileUpload(file_path, mimetype=mime_type, resumable=True)

    permission = {
        'type': 'anyone',
        'role': 'reader',
    }
    file = drive_service.files().create(
        body=file_metadata, 
        media_body=media,
        fields='id'
    ).execute()
    file_id = file.get('id')

    drive_service.permissions().create(
        fileId=file_id,
        body=permission,
    ).execute()

    file_url = f"https://drive.google.com/uc?id={file_id}&export=view"

    print(file_url)
    return file_url



# list_folder(delete=True)
# upload_file('./shoe.jpg', file_name='shoe', parent_folder_id=id)
