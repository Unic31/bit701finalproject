package data.service;

import data.dto.MemberDto;
import data.mapper.MemberMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class MemberSerive implements MemberServiceInter{

    private MemberMapper memberMapper;

    @Override
    public void insertMember(MemberDto dto) {
        memberMapper.insertMember(dto);
    }

    @Override
    public List<MemberDto> getAllMembers() {
        return memberMapper.getAllMembers();
    }

    @Override
    public int getSearchId(String myid) {
        return memberMapper.getSearchId(myid);
    }

    @Override
    public int getLogin(String myid, String mypass) {
        Map<String, Object> map = new HashMap<>();
        map.put("myid",myid);
        map.put("mypass",mypass);
        return memberMapper.getLogin(map);
    }

    @Override
    public String getName(String myid) {
        return memberMapper.getName(myid);
    }

    @Override
    public void deleteMember(int num) {
        memberMapper.deleteMember(num);
    }
}
