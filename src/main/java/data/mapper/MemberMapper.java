package data.mapper;

import data.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MemberMapper {
    public void insertMember(MemberDto dto);
    public List<MemberDto> getAllMembers();
    public int getSearchId(String myid);
    public int getLogin(Map<String, Object> map);
    public String getName(String myid);
    public void deleteMember(int num);
}
