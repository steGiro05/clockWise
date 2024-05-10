from dataclasses import dataclass, asdict

@dataclass
class UserStats:
    avg_entry_time: str
    avg_exit_time: str
    avg_pause_duration: float

    def to_dict(self):
        return asdict(self)