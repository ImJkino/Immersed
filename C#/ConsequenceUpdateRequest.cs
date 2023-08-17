public class ConsequenceUpdateRequest : ConsequenceAddRequest
{
    [Required, Range(1, Int32.MaxValue)]
    public int Id { get; set; }
    public bool IsActive { get; set; }
    public bool isDeleted { get; set; }
}
