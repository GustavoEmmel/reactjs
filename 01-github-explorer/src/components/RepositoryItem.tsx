interface IRepositoryItemProps {
    repository: {
        name: string;
        description: string;
        html_url: string;
    }
}

export function RepositoryItem(props: IRepositoryItemProps) {
    return (
        <li>
            <strong>{props.repository?.name ?? 'default'}</strong>
            <p>{props.repository?.description ?? 'desc default'}</p>

            <a href={props.repository?.html_url ?? ''}>
                Acessar repositório
            </a>
        </li>
    );
}
