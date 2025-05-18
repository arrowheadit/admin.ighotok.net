export interface FileManagerContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}


// TypeScript definitions
export interface FileManagerProps {
    dialogController?: [boolean, (open: boolean) => void];
    onFileSelect?: (files: FileItem[]) => void;
    multiple?: boolean;
    defaultView?: "grid" | "list";
}
 
export interface FolderItem {
    id: number;
    name: string;
    parentId: number | null;
    children?: number[];
}

export interface FileItem {
    id: number;
    name: string;
    type: string;
    size: string;
    modified: string;
    folderId: number;
    selected?: boolean;
}

export type FolderContents = {
    [key: number]: FileItem[];
}

export type ViewMode = "grid" | "list";