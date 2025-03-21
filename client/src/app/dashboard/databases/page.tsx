export default function DatabasesPage() {
    const { data } = useSWR('/api/databases', fetcher);
    
    return (
      <div className="p-8">
        <DatabaseTable connections={data} />
      </div>
    )
  }