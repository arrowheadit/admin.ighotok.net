import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { 
  Folder, File, FileText, FileImage, FileArchive,
  Upload, Plus, Trash2, Grid, List, Check, ChevronRight, ChevronDown
} from "lucide-react";
import type { FileItem, FileManagerProps, FolderContents, FolderItem, ViewMode } from "@/types/file-manager";

export default function FileManager({ 
  dialogController, 
  onFileSelect,
  multiple = false,
  defaultView = "grid"
}: FileManagerProps) {
  // State to control dialog visibility (using provided controller or internal state)
  const [internalOpen, setInternalOpen] = useState(true);
  const [open, setOpen] = dialogController || [internalOpen, setInternalOpen];
  
  // State for active folder, selected files, and view mode
  const [activeFolder, setActiveFolder] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView);
  
  // State for folder operations
  const [expandedFolders, setExpandedFolders] = useState<number[]>([]);
  const [showNewFolderInput, setShowNewFolderInput] = useState<number | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [nextFolderId, setNextFolderId] = useState(8); // Start after the initial folders
  
  // Sample folders data with parent-child relationships
  const [folders, setFolders] = useState<FolderItem[]>([
    { id: 0, name: "Documents", parentId: null },
    { id: 1, name: "Images", parentId: null },
    { id: 2, name: "Downloads", parentId: null },
    { id: 3, name: "Projects", parentId: 0, children: [6, 7] },
    { id: 4, name: "Shared Files", parentId: null },
    { id: 5, name: "Archive", parentId: null },
    { id: 6, name: "Work", parentId: 3 },
    { id: 7, name: "Personal", parentId: 3 }
  ]);
  
  // Sample files data for each folder
  const [folderContents, setFolderContents] = useState<FolderContents>({
    0: [
      { id: 1, name: "Annual Report.pdf", type: "pdf", size: "2.4 MB", modified: "Today", folderId: 0 },
      { id: 2, name: "Meeting Notes.docx", type: "doc", size: "145 KB", modified: "Yesterday", folderId: 0 },
      { id: 3, name: "Project Outline.txt", type: "txt", size: "32 KB", modified: "May 10, 2025", folderId: 0 },
      { id: 4, name: "Contract.pdf", type: "pdf", size: "3.1 MB", modified: "May 5, 2025", folderId: 0 }
    ],
    1: [
      { id: 1, name: "Profile Picture.jpg", type: "jpg", size: "1.2 MB", modified: "May 12, 2025", folderId: 1 },
      { id: 2, name: "Banner Image.png", type: "png", size: "2.8 MB", modified: "May 8, 2025", folderId: 1 },
      { id: 3, name: "Screenshot.png", type: "png", size: "645 KB", modified: "Today", folderId: 1 }
    ],
    2: [
      { id: 1, name: "Software Update.exe", type: "exe", size: "45.8 MB", modified: "Yesterday", folderId: 2 },
      { id: 2, name: "Dataset.csv", type: "csv", size: "8.2 MB", modified: "May 13, 2025", folderId: 2 }
    ],
    3: [],
    4: [
      { id: 1, name: "Team Calendar.xlsx", type: "xlsx", size: "875 KB", modified: "Today", folderId: 4 },
      { id: 2, name: "Shared Presentation.pptx", type: "pptx", size: "4.2 MB", modified: "May 10, 2025", folderId: 4 }
    ],
    5: [
      { id: 1, name: "Old Reports.zip", type: "zip", size: "15.6 MB", modified: "April 25, 2025", folderId: 5 },
      { id: 2, name: "Backup Files.tar", type: "tar", size: "32.1 MB", modified: "April 20, 2025", folderId: 5 }
    ],
    6: [
      { id: 1, name: "Q1 Analysis.xlsx", type: "xlsx", size: "1.8 MB", modified: "May 1, 2025", folderId: 6 },
      { id: 2, name: "Client Proposals.pdf", type: "pdf", size: "5.2 MB", modified: "April 28, 2025", folderId: 6 }
    ],
    7: [
      { id: 1, name: "Vacation Photos.zip", type: "zip", size: "254 MB", modified: "May 13, 2025", folderId: 7 },
      { id: 2, name: "Budget Planner.xlsx", type: "xlsx", size: "320 KB", modified: "May 8, 2025", folderId: 7 }
    ]
  });
  
  // Function to get appropriate icon based on file type
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'jpg':
      case 'png':
      case 'gif':
        return <FileImage className="h-5 w-5 text-green-500" />;
      case 'zip':
      case 'tar':
      case 'rar':
        return <FileArchive className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Function to toggle file selection
  const toggleFileSelection = (file: FileItem) => {
    setSelectedFiles(prev => {
      // If multiple selection is not allowed, replace the current selection
      if (!multiple) {
        return [file];
      }
      
      // Check if file is already selected
      const isSelected = prev.some(f => f.id === file.id);
      
      // If selected, remove it; otherwise, add it
      if (isSelected) {
        return prev.filter(f => f.id !== file.id);
      } else {
        return [...prev, file];
      }
    });
  };
  
  // Function to check if a file is selected
  const isFileSelected = (file: FileItem): boolean => {
    return selectedFiles.some(f => f.id === file.id && f.name === file.name);
  };
  
  // Handle file selection confirmation
  const handleSelectFiles = () => {
    if (onFileSelect && selectedFiles.length > 0) {
      onFileSelect(selectedFiles);
      setOpen(false);
    }
  };

  // Function to toggle folder expansion
  const toggleFolderExpansion = (folderId: number) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId) 
        : [...prev, folderId]
    );
  };

  // Function to get child folders
  const getChildFolders = (parentId: number | null) => {
    return folders.filter(folder => folder.parentId === parentId);
  };

  // Function to add a new folder
  const addNewFolder = (parentId: number | null) => {
    if (newFolderName.trim() === "") return;
    
    const newFolder: FolderItem = {
      id: nextFolderId,
      name: newFolderName,
      parentId: parentId
    };
    
    setFolders(prev => [...prev, newFolder]);
    setFolderContents(prev => ({...prev, [nextFolderId]: []}));
    setNextFolderId(prev => prev + 1);
    setNewFolderName("");
    setShowNewFolderInput(null);
    
    // If adding to a parent folder, update the parent's children array
    if (parentId !== null) {
      setFolders(prev => 
        prev.map(folder => 
          folder.id === parentId 
            ? { 
                ...folder, 
                children: folder.children ? [...folder.children, newFolder.id] : [newFolder.id] 
              } 
            : folder
        )
      );
    }
  };

  // Function to remove a folder
  const removeFolder = (folderId: number) => {
    // Get all descendant folder IDs (recursive)
    const getAllDescendants = (id: number): number[] => {
      const children = folders.filter(f => f.parentId === id).map(f => f.id);
      return [
        ...children,
        ...children.flatMap(childId => getAllDescendants(childId))
      ];
    };
    
    const descendantIds = getAllDescendants(folderId);
    const allIdsToRemove = [folderId, ...descendantIds];
    
    // Remove the folder and all its descendants
    setFolders(prev => prev.filter(folder => !allIdsToRemove.includes(folder.id)));
    
    // Remove folder contents
    setFolderContents(prev => {
      const newContents = {...prev};
      allIdsToRemove.forEach(id => {
        delete newContents[id];
      });
      return newContents;
    });
    
    // Update parent's children array
    const folderToRemove = folders.find(f => f.id === folderId);
    if (folderToRemove && folderToRemove.parentId !== null) {
      setFolders(prev => 
        prev.map(folder => 
          folder.id === folderToRemove.parentId 
            ? { 
                ...folder, 
                children: folder.children?.filter(id => id !== folderId) 
              } 
            : folder
        )
      );
    }
    
    // If active folder is being removed, set active folder to parent or root
    if (activeFolder === folderId || descendantIds.includes(activeFolder)) {
      const parentFolder = folderToRemove?.parentId ?? 0;
      setActiveFolder(parentFolder);
    }
  };

  // Recursive function to render folder tree
  const renderFolderTree = (parentId: number | null, depth = 0) => {
    const childFolders = getChildFolders(parentId);
    
    return childFolders.map((folder) => {
      const hasChildren = folders.some(f => f.parentId === folder.id);
      const isExpanded = expandedFolders.includes(folder.id);
      
      return (
        <div key={folder.id} style={{ marginLeft: `${depth * 12}px` }}>
          <div 
            className={`flex min-w-fit mt-3 items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 ${activeFolder === folder.id ? 'bg-blue-50 border border-blue-200' : ''}`}
          >
            <div className="flex items-center gap-2 flex-1" onClick={() => setActiveFolder(folder.id)}>
              {hasChildren && (
                <button 
                  className="p-0.5 hover:bg-gray-200 rounded-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolderExpansion(folder.id);
                  }}
                >
                  {isExpanded ? 
                    <ChevronDown className="h-3 w-3 text-gray-500" /> : 
                    <ChevronRight className="h-3 w-3 text-gray-500" />
                  }
                </button>
              )}
              {!hasChildren && <div className="w-4" />}
              <Folder className={`h-5 w-5 ${activeFolder === folder.id ? 'text-blue-500' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium truncate ${activeFolder === folder.id ? 'text-blue-700' : ''}`}>
                {folder.name}
              </span>
            </div>
            
            <div className="flex items-center">
              <button
                type="button"
                className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNewFolderInput(folder.id);
                }}
                title="Add subfolder"
              >
                <Plus className="h-3 w-3 text-gray-500" />
              </button>
              <button
                type="button"
                className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFolder(folder.id);
                }}
                title="Remove folder"
              >
                <Trash2 className="h-3 w-3 text-gray-500" />
              </button>
            </div>
          </div>
          
          {showNewFolderInput === folder.id && (
            <div 
              ref={newFolderInputRef}
              className="flex items-center ml-6 mt-1 mb-1"
            >
              <input
                type="text"
                className="text-sm border rounded px-2 py-1 w-full"
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addNewFolder(folder.id);
                  if (e.key === 'Escape') {
                    setShowNewFolderInput(null);
                    setNewFolderName("");
                  }
                }}
              />
              <Button 
                size="sm" 
                variant="ghost" 
                className="ml-1 p-1"
                onClick={() => addNewFolder(folder.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {isExpanded && (
            <div className="ml-2 min-w-fit">
              {renderFolderTree(folder.id, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  // Add ref for the new folder input container
  const newFolderInputRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle clicks outside the new folder input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showNewFolderInput !== null && 
        newFolderInputRef.current && 
        !newFolderInputRef.current.contains(event.target as Node)
      ) {
        setShowNewFolderInput(null);
        setNewFolderName("");
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNewFolderInput]);
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)} />
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <DialogTitle className="text-xl font-semibold">File Manager</DialogTitle>
          {/*  */}
          <div className="flex gap-2">
            {/* View toggle buttons */}
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant="ghost" 
                size={"sm"}
                className={`cursor-pointer p-1.5 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost" 
                size={"sm"}
                className={`cursor-pointer p-1.5 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-4 border rounded-md">
          {/* Folder sidebar */}
          <div 
            className="col-span-4 h-[450px] overflow-y-auto border-r p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            tabIndex={0}
            onWheel={(e) => {
              e.currentTarget.scrollTop += e.deltaY;
            }}
          >
            <div className="min-w-[200px]">
              {/* Root level new folder input or button */}
              {showNewFolderInput === null ? (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1 w-full mb-2" 
                  onClick={() => setShowNewFolderInput(-1)}
                > 
                  <Plus className="h-4 w-4" /> 
                  <span>New Folder</span> 
                </Button>
              ) : (
                showNewFolderInput === -1 && (
                  <div 
                    ref={newFolderInputRef}
                    className="flex items-center mb-2"
                  >
                    <input
                      type="text"
                      className="text-sm border rounded px-2 py-1 w-full"
                      placeholder="New folder name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addNewFolder(null);
                        if (e.key === 'Escape') {
                          setShowNewFolderInput(null);
                          setNewFolderName("");
                        }
                      }}
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="ml-1 p-1"
                      onClick={() => addNewFolder(null)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                )
              )}
              
              {/* Folder tree */}
              {renderFolderTree(null)}
            </div>
          </div>
          
          {/* File content area */}
          <div className="col-span-8 h-[450px] overflow-y-auto p-3 relative">
            {/* Floating Upload Button */}
            <Button 
              size="sm" 
              variant="default" 
              className="absolute bottom-4 right-4 rounded-full w-12 h-12 shadow-md flex items-center justify-center p-0 z-10 bg-blue-600 hover:bg-blue-700"
              title="Upload Files"
            >
              <Upload className="h-5 w-5 text-white" />
            </Button>
            
            {/* Files header - only show in list view */}
            {viewMode === 'list' && (
              <div className="grid grid-cols-12 border-b pb-2 text-sm font-medium text-gray-500">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-3">Modified</div>
                <div className="col-span-1"></div>
              </div>
            )}
            
            {/* Files list - List View */}
            {viewMode === 'list' && (
              <div className="space-y-1 mt-2">
                {folderContents[activeFolder]?.map((file) => (
                  <div 
                    key={file.id}
                    className={`grid grid-cols-12 items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 ${isFileSelected(file) ? 'bg-blue-50' : ''}`}
                    onClick={() => toggleFileSelection(file)}
                  >
                    <div className="col-span-6 flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-500">{file.size}</div>
                    <div className="col-span-3 text-sm text-gray-500">{file.modified}</div>
                    <div className="col-span-1 flex justify-end">
                      {isFileSelected(file) && <Check className="h-4 w-4 text-blue-500" />}
                    </div>
                  </div>
                ))}
                {(!folderContents[activeFolder] || folderContents[activeFolder].length === 0) && (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <File className="h-12 w-12 mb-2 opacity-30" />
                    <p className="text-sm">No files in this folder</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Files grid - Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-4 gap-4 mt-2">
                {folderContents[activeFolder]?.map((file) => (
                  <div 
                    key={file.id}
                    className={`flex flex-col items-center p-3 rounded-md border cursor-pointer hover:bg-gray-50 ${isFileSelected(file) ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
                    onClick={() => toggleFileSelection(file)}
                  >
                    <div className="relative mb-2">
                      {getFileIcon(file.type)}
                      {isFileSelected(file) && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-0.5">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-center truncate w-full">{file.name}</span>
                    <span className="text-xs text-gray-500 mt-1">{file.size}</span>
                  </div>
                ))}
                {(!folderContents[activeFolder] || folderContents[activeFolder].length === 0) && (
                  <div className="col-span-4 flex flex-col items-center justify-center py-10 text-gray-400">
                    <File className="h-12 w-12 mb-2 opacity-30" />
                    <p className="text-sm">No files in this folder</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-4 flex justify-end gap-x-2.5">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="default"
            onClick={handleSelectFiles}
            disabled={selectedFiles.length === 0}
          >
            Select {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
