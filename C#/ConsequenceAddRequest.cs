public class ConsequenceAddRequest
{
    [Required, MinLength(2), MaxLength(100)]
    public string Name { get; set; }
    [Required, MinLength(2), MaxLength(500)]
    public string Description { get; set; }
    [Required, Range(1, Int32.MaxValue)]
    public int ConsequenceTypeId { get; set; }
    [Required, Range(1, Int32.MaxValue)]
    public int ActorId { get; set; }
    [AllowNull]
    public int? ZoneId { get; set; }
}
