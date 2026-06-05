import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    DecoratorNode,
    type NodeKey,
    type SerializedLexicalNode,
} from 'lexical';
import { useCallback, useEffect, type JSX } from 'react';

export const INSERT_IMAGE_COMMAND = 'INSERT_IMAGE_COMMAND';

type ImagePayload = {
    src: string;
    alt?: string;
};

type SerializedImageNode = SerializedLexicalNode & {
    src: string;
    alt?: string;
};

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __alt: string;

    static getType(): string {
        return 'image';
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(node.__src, node.__alt, node.__key);
    }

    constructor(src: string, alt?: string, key?: NodeKey) {
        super(key);
        this.__src = src;
        this.__alt = alt ?? '';
    }

    createDOM(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'image-container my-4 text-center';
        return div;
    }

    updateDOM(): false {
        return false;
    }

    decorate(): JSX.Element {
        return (
            <img
                src={this.__src}
                alt={this.__alt || 'Image insérée'}
                className="h-auto max-w-full rounded-lg shadow-sm"
                style={{ maxHeight: '400px' }}
                draggable={false}
            />
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        return new ImageNode(serializedNode.src, serializedNode.alt);
    }

    exportJSON(): SerializedImageNode {
        return {
            type: 'image',
            src: this.__src,
            alt: this.__alt,
            version: 1,
        };
    }
}

export function $createImageNode(src: string, alt?: string): ImageNode {
    return new ImageNode(src, alt);
}

export default function ImagePlugin() {
    const [editor] = useLexicalComposerContext();

    const processImageFile = useCallback(
        (file: File) => {
            if (!file.type.startsWith('image/')) {
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                window.alert("L'image est trop volumineuse. Taille maximale : 5 Mo.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const src = event.target?.result;
                if (typeof src === 'string') {
                    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                        src,
                        alt: file.name,
                    });
                }
            };
            reader.readAsDataURL(file);
        },
        [editor],
    );

    useEffect(() => {
        const editorElement = editor.getRootElement();
        if (!editorElement) {
            return;
        }

        let dragCounter = 0;

        const preventDefaults = (event: DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const handleDragEnter = (event: DragEvent) => {
            preventDefaults(event);
            dragCounter++;
            editorElement.classList.add('drag-over');
        };

        const handleDragLeave = (event: DragEvent) => {
            preventDefaults(event);
            dragCounter--;
            if (dragCounter === 0) {
                editorElement.classList.remove('drag-over');
            }
        };

        const handleDrop = (event: DragEvent) => {
            preventDefaults(event);
            dragCounter = 0;
            editorElement.classList.remove('drag-over');

            const files = Array.from(event.dataTransfer?.files ?? []);
            files
                .filter((file) => file.type.startsWith('image/'))
                .forEach((file) => processImageFile(file));
        };

        editorElement.addEventListener('dragenter', handleDragEnter);
        editorElement.addEventListener('dragleave', handleDragLeave);
        editorElement.addEventListener('dragover', preventDefaults);
        editorElement.addEventListener('drop', handleDrop);

        return () => {
            editorElement.removeEventListener('dragenter', handleDragEnter);
            editorElement.removeEventListener('dragleave', handleDragLeave);
            editorElement.removeEventListener('dragover', preventDefaults);
            editorElement.removeEventListener('drop', handleDrop);
        };
    }, [editor, processImageFile]);

    useEffect(() => {
        const editorElement = editor.getRootElement();
        if (!editorElement) {
            return;
        }

        const handlePaste = (event: ClipboardEvent) => {
            const items = Array.from(event.clipboardData?.items ?? []);
            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    event.preventDefault();
                    const file = item.getAsFile();
                    if (file) {
                        processImageFile(file);
                    }
                    break;
                }
            }
        };

        editorElement.addEventListener('paste', handlePaste);
        return () => editorElement.removeEventListener('paste', handlePaste);
    }, [editor, processImageFile]);

    useEffect(() => {
        return editor.registerCommand<ImagePayload>(
            INSERT_IMAGE_COMMAND,
            (payload) => {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        const imageNode = $createImageNode(
                            payload.src,
                            payload.alt,
                        );
                        selection.insertNodes([imageNode]);
                        selection.insertNodes([$createParagraphNode()]);
                    }
                });
                return true;
            },
            1,
        );
    }, [editor]);

    return null;
}
